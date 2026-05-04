hdfs dfs -mkdir /lab
hdfs dfs -mkdir /lab/input
hdfs dfs -put file.txt /lab/input
hdfs dfs -ls /lab
hdfs dfs -cat /lab/input/file.txt
hdfs dfs -get /lab/input/file.txt .
hdfs dfs -rm /lab/input/file.txt
hdfs dfs -du /lab
hdfs dfs -df -h
hdfs dfs -rmdir /lab/input
