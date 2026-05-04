hdfs dfs -mkdir /weather
hdfs dfs -put input.txt /weather

hadoop jar weather.jar temp.AverageDriver /weather /output

hdfs dfs -cat /output/part-r-00000
