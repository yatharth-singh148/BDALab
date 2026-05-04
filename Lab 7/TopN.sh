hdfs dfs -mkdir /input_dir
hdfs dfs -put input.txt /input_dir

hadoop jar topn.jar samples.topn.TopNDriver /input_dir /temp_out /final_out

hdfs dfs -cat /final_out/part-r-00000
