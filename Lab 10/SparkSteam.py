# Install NLTK (run once outside script if needed)
# pip install nltk

import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lower, regexp_replace, split, explode, udf
from pyspark.sql.types import ArrayType, StringType
from pyspark.ml.feature import StopWordsRemover
from nltk.stem import WordNetLemmatizer

# Initialize Spark Session
spark = SparkSession.builder \
    .appName("TextCleaningStreaming") \
    .getOrCreate()

spark.sparkContext.setLogLevel("ERROR")

# Create socket stream (PORT = 9999)
lines = spark.readStream \
    .format("socket") \
    .option("host", "localhost") \
    .option("port", 9999) \
    .load()

# Step 1: Lowercase + remove punctuation
cleaned = lines.select(
    regexp_replace(lower(col("value")), "[^a-zA-Z\\s]", "").alias("cleaned")
)

# Step 2: Tokenization
tokens = cleaned.select(
    split(col("cleaned"), "\\s+").alias("words")
)

# Step 3: Remove stop words
remover = StopWordsRemover(inputCol="words", outputCol="filtered")
filtered = remover.transform(tokens)

# Step 4: Lemmatization
lemmatizer = WordNetLemmatizer()

def lemmatize_words(words):
    return [lemmatizer.lemmatize(word) for word in words if word != ""]

lemmatize_udf = udf(lemmatize_words, ArrayType(StringType()))

lemmatized = filtered.withColumn(
    "lemmatized",
    lemmatize_udf(col("filtered"))
)

# Step 5: Flatten + output
final_words = lemmatized.select(
    explode(col("lemmatized")).alias("word")
)

# Output to console
query = final_words.writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

query.awaitTermination()
