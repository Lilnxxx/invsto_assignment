from flask import Flask,request
import mysql.connector
import pandas as pd
# from werkzeug import secure_filename



mydb = mysql.connector.connect(
    host = "localhost",
    user = "mint",
    password = "pass1",
    database="assesment4"
)
cursor=mydb.cursor()
# cursor = cnx.cursor(buffered=True)
# cursor.execute('select * from filedata')

app= Flask(__name__)

@app.route('/')
def home():
    return 'hello i am flask api'
@app.route('/getdata')
def getdata():
    cursor.execute(''' select * from filedata''') # here, the 'conn'
    
    df = pd.DataFrame(cursor.fetchall())
    f = open("repo.csv", "w")
    f.write("datetime,close,high,low,open,volume,instrument\n")
    f.close()
    df.to_csv('repo.csv',index=False,header=0,mode='a')
    gf= open('repo.csv')
    return gf
@app.route('/senddata',methods=['POST'])
async def senddata():
    f = request.files
    try:
        print(f)
        f['files[]'].save('/var/lib/mysql-files/h.csv')
    except:
        return('file error')
    qery="CREATE TABLE filedata (DateTime varchar(255),Close varchar(255),High varchar(255),Low varchar(255),Open varchar(255),Volume varchar(255),instrument varchar(255));"
    # print("hereeeeeeeeeeeeeeeeeeeee")
    try:
        cursor.execute("drop table filedata")
        mydb.commit()
        cursor.execute(qery)
        mydb.commit()
        cursor.execute("""  LOAD DATA INFILE '/var/lib/mysql-files/h.csv' INTO TABLE filedata FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS; """)
        mydb.commit()
    except:
        return 'data insertion error'
    print('new data added success')
    return 'data sent successfull'

if __name__=="__main__":
    app.run(debug=1)