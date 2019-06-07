var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');

var server=new hapi.Server({
    host:'localhost',
    port:3001
});

//SECTION 1-PRODUCER
//1.1.GET

server.route({
    method:"GET",
    path:"/api/producers/",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from producer`, function (error,producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
    
});

//1.2.POST

server.route({
  method:"POST",
  path:"/api/producers/",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.producerName;
    var mail=request.payload.email;
    var password=request.payload.passwordHash;
    var twitter=request.payload.twitterName;
    var soundcloud=request.payload.soundcloudName;
    var status=request.payload.producerStatus;
    if((name.length==1)||(mail.length==1)||(password.length==1)||(twitter.length==1)||(soundcloud.length==1)){
      return "ALL THE FIELDS MUST BE FILLED";
    }
else{
    if(name.length>=32){
      errors.push("Name should contain less than 32 characters")
      c++;
    }
    if(name.includes("XxXxStr8FireXxX")==true){
      errors.push("Enter a valid name")
      c++;
    }
    if(mail.length>=256){
      errors.push("Mail should contain less than 256 characters")
      c++;
    }
    if((mail.includes('@')==false)||(mail.includes('.')==false)){
      errors.push("Enter a valid email")
      c++;
    }
    if(password.length<=10){
      errors.push("Enter a strong password ")
      c++;
    }
    if(twitter.length>=16){
      errors.push("Twitter Name must contain less than 16 characters")
      c++;
    }
    if(soundcloud.length>=32){
      errors.push("Sound Cloud Name must contain less than 32 characters")
      c++;
    }
    if((status!="none")&&(status!="not ready")&&(status!="featured")){
      errors.push("Not a valid status")
      c++;
    }
  }

  if(c!=1)
      return errors;
    else
{
    var newProducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`INSERT INTO producer(producerName,email,passwordHash,twitterName,soundcloudName,producerStatus) VALUES('${newProducer.producerName}','${newProducer.email}','${newProducer.passwordHash}','${newProducer.twitterName}','${newProducer.soundcloudName}','${newProducer.producerStatus}')`, function (error, producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
}
    
});

//1.3.GET ID

server.route({
    method:"GET",
    path:"/api/producers/{id}",
    handler:(request,reply)=>{
    	var id=request.params.id;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from producer where producerId=${id}`, function (error,producer, fields) {
                if (error) reject(error);
                resolve(producer);
              });
               
              connection.end();
        })
        
    }
    
});

//1.4.DELETE

server.route({
	method:"DELETE",
	path:"/api/producers/{id}",
	handler:(request,reply)=>{
		var num=request.params.id;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              	
              connection.query(`DELETE FROM producer WHERE producerId=${num}`, function (error, producer, fields) {
            if (error) reject (error);
           
            resolve(producer);
          });
           
          connection.end();
    })

    }
})

//1.5.PUT

server.route({
	method:"PUT",
	path:"/api/producers/{id}",
	handler:(request,reply)=>{
		var errors=[];
		var c=1;
		var name=request.payload.producerName;
		var mail=request.payload.email;
		var password=request.payload.passwordHash;
		var twitter=request.payload.twitterName;
		var soundcloud=request.payload.soundcloudName;
		var status=request.payload.producerStatus;
		if((name.length==1)||(mail.length==1)||(password.length==1)||(twitter.length==1)||(soundcloud.length==1)){
			return "ALL THE FIELDS MUST BE FILLED";
		}
else{
		if(name.length>=32){
			errors.push("Name should contain less than 32 characters")
			c++;
		}
		if(name.includes("XxXxStr8FireXxX")==true){
			errors.push("Enter a valid name")
			c++;
		}
		if(mail.length>=256){
			errors.push("Mail should contain less than 256 characters")
			c++;
		}
		if((mail.includes('@')==false)||(mail.includes('.')==false)){
			errors.push("Enter a valid email")
			c++;
		}
		if(password.length<=10){
			errors.push("Enter a strong password ")
			c++;
		}
		if(twitter.length>=16){
			errors.push("Twitter Name must contain less than 16 characters")
			c++;
		}
		if(soundcloud.length>=32){
			errors.push("Sound Cloud Name must contain less than 32 characters")
			c++;
		}
		if((status!="none")&&(status!="not ready")&&(status!="featured")){
			errors.push("Not a valid status")
			c++;
		}
	}
	
		if(c!=1)
			return errors;
		else
		{
		var id=request.params.id;
		var newProducer=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
               connection.query(`UPDATE producer SET producerName='${newProducer.producerName}',
               	email='${newProducer.email}',
                passwordHash='${newProducer.passwordHash}',
                twitterName='${newProducer.twitterName}',
                soundcloudName='${newProducer.soundcloudName}'
            WHERE producerId=${id}`, function (error, producer, fields) {
            if (error) reject (error);
           
            resolve(producer);
          });
           
          connection.end();
    })
    }
}
    })

//2.0.GET

server.route({
    method:"GET",
    path:"/api/beats",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//1.6.GET APPROVED BEATS

server.route({
    method:"GET",
    path:"/api/producers/approvedBeats",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT producerName,beatName from producer inner join beat on producer.producerId=beat.producersId where approved=1`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//1.7.GET SUBMITTED BEATS

server.route({
    method:"GET",
    path:"/api/producers/submittedBeats",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT producerName,beatName from producer inner join beat on producer.producerId=beat.producersId where submitDate!='null'`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//SECTION:2-BEATS
//2.1.GET IF SUBMITTED BUT NOT APPROVED 

server.route({
    method:"GET",
    path:"/api/beats/submitted",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where submitDate!='null' and approved=0`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.2.GET BEATS BETWEEN TWO DATES

server.route({
    method:"GET",
    path:"/api/beats/approved/{startdate}/{enddate}",
    handler:(request,reply)=>{
    	var startdate=request.params.startdate;
    	var enddate=request.params.enddate;
    	return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and post between '${startdate}'and'${enddate}'`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.3.GET BEATS FROM A CERTAIN DATE TO TILL DATE

server.route({
    method:"GET",
    path:"/api/beats/posted/{startdate}",
    handler:(request,reply)=>{
      var startdate=request.params.startdate;
      var enddate=request.params.enddate;
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and post between '${startdate}'and current_timestamp`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.4.GET APPROVED BEATS WITH NO YET APPROVAL DATE

server.route({
    method:"GET",
    path:"/api/beats/pending",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where approved=1 and approvalDate>current_timestamp or approvalDate='null' `, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.5.POST

server.route({
	method:"POST",
	path:"/api/beats",
	handler:(request,reply)=>{

		var errors=[];
		var c=1;
		var name=request.payload.beatName;
    var url=request.payload.beatUrl;
    var approval=request.payload.approved;
    var producers=request.payload.producersId;
    var submit=request.payload.submitDate;
    var approve=request.payload.approvalDate;
    var posted=request.payload.post;
    if(name.length==1||url.length==1){
      return "ALL THE FIELDS MUST BE FILLED";
    }
    else{
		if(name.length>=64){
			errors.push("Name should contain less than 64 characters")
			c++;
		}
		if(name.includes("MUST LISTEN")==true){
			errors.push("Not a valid name")
			c++;
		}
  }
    if(c!=1)
			return errors;
		else
		{
		var newBeat=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
               connection.query(`INSERT INTO beat(beatName,beatUrl,approved,producersId,submitDate,approvalDate,post) VALUES('${newBeat.beatName}','${newBeat.beatUrl}','${newBeat.approved}','${newBeat.producersId}','${newBeat.submitDate}','${newBeat.approvalDate}','${newBeat.post}')`, function (error, beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.6.GET ID

server.route({
    method:"GET",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
      var id=request.params.id;
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
     
              connection.query(`SELECT * from beat where beatId=${id}`, function (error,beat, fields) {
                if (error) reject(error);
                resolve(beat);
              });
               
              connection.end();
        })
        
    }
    
});

//2.7.DELETE

server.route({
  method:"DELETE",
  path:"/api/beats/{id}",
  handler:(request,reply)=>{
    var id=request.params.id;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
                
              connection.query(`DELETE FROM beat WHERE beatId=${id}`, function (error, beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })

    }
})

//2.8.PUT

server.route({
	method:"PUT",
	path:"/api/beats/{id}",
	handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beatName;
    var url=request.payload.beatUrl;
    var approval=request.payload.approved;
    var producers=request.payload.producersId;
    var submit=request.payload.submitDate;
    var approve=request.payload.approvalDate;
    var posted=request.payload.post;
		var name=request.payload.beatName;
    if(name.length==1||url.length==1){
      return "ALL THE FIELDS MUST BE FILLED";
    }
    else{
		if(name.length>=64){
			errors.push("Name should contain less than 64 characters")
			c++;
		}
		if(name.includes("MUST LISTEN")==true){
			errors.push("Not a valid name")
			c++;
		}
  }
		if(c!=1)
			return errors;
		else
		{
			var id=request.params.id;
		var newBeat=request.payload;
		
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET beatName='${newBeat.beatName}',
               	beatUrl='${newBeat.beatUrl}',
                approved='${newBeat.approved}',
                producersId='${newBeat.producersId}',
                submitDate='${newBeat.submitDate}',
                approvalDate='${newBeat.approvalDate}',
                post='${newBeat.post}'
            WHERE beatId=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.9.PUT APPROVED BEATS

server.route({
  method:"PUT",
  path:"/api/beats/approve/{id}",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beatName;
    if(name.length>=64){
      errors.push("Name should contain less than 64 characters")
      c++;
    }
    if(name.includes("MUST LISTEN")==true){
      errors.push("Not a valid name")
      c++;
    }
    if(c!=1)
      return errors;
    else
    {
      var id=request.params.id;
    var newBeat=request.payload;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET 
                approvalDate='${newBeat.approvalDate}',
                post='${newBeat.post}'
            WHERE beatId=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })

//2.10.PUT UNAPPROVED BEATS

server.route({
  method:"PUT",
  path:"/api/beats/unapprove/{id}",
  handler:(request,reply)=>{
    var errors=[];
    var c=1;
    var name=request.payload.beatName;
    if(name.length>=64){
      errors.push("Name should contain less than 64 characters")
      c++;
    }
    if(name.includes("MUST LISTEN")==true){
      errors.push("Not a valid name")
      c++;
    }
    if(c!=1)
      return errors;
    else
    {
      var id=request.params.id;
    var newBeat=request.payload;
    
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`UPDATE beat SET 
                approvalDate='${newBeat.approvalDate}',
                post='${newBeat.post}'
            WHERE beatId=${id}`, function (error,beat, fields) {
            if (error) reject (error);
           
            resolve(beat);
          });
           
          connection.end();
    })
    }
}
    })


server.start((err)=>{
    if(err) throw err;
    
})


console.log("Server is started")