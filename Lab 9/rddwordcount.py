from pyspark import SparkContext

sc = SparkContext("local", "WordCount")

text = sc.textFile("input.txt")

counts = text.flatMap(lambda x: x.split()) \
             .map(lambda x: (x, 1)) \
             .reduceByKey(lambda a, b: a + b)

filtered = counts.filter(lambda x: x[1] > 4)

filtered.collect()
