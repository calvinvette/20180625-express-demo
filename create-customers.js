#!/usr/bin/env mongo

var db = connect("127.0.0.1/weasleys");

db.customers.drop();
db.counters.drop();
db.dropDatabase();

db.counters.insert({ name:"customerId", sequence_value:0 });

function getNextSequenceValue(sequenceName){

   var sequenceDocument = db.counters.findAndModify({
      query:{ name : sequenceName },
      update: {$inc:{sequence_value:1}},
      new:true
   });
	
   return sequenceDocument.sequence_value;
}

var customers = [
  {"firstName":"Harry","customerId":"1","workAddress":"1","lastName":"Potter","homeAddress":"2","phoneNumber":"+44 0206 987-1234", "email": "harry.potter@hogwarts.ac.uk", "birthDate": "1980-07-31"},
  {"firstName":"Ron","customerId":"2","workAddress":"3","lastName":"Weasley","homeAddress":"4","phoneNumber":"+44 0206 987-1143", "email": "ron.weasley@hogwarts.ac.uk", "birthDate": "1980-03-01"},
  {"firstName":"Hermione","customerId":"3","workAddress":"5","lastName":"Granger","homeAddress":"NULL","phoneNumber":"+44 0206 987-6631", "email": "hermione.granger@hogwarts.ac.uk", "birthDate": "1979-09-19"},
  {"firstName":"Neville","customerId":"4","workAddress":"6","lastName":"Longbottom","homeAddress":"NULL","phoneNumber":"+44 0206 987-5151", "email": "neville.longbottom@hogwarts.ac.uk", "birthDate": "1980-07-30"},
  {"firstName":"Dean","customerId":"5","workAddress":"7","lastName":"Thomas","homeAddress":"NULL","phoneNumber":"+44 0206 987-5157", "email": "dean.thomas@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Seamus","customerId":"6","workAddress":"8","lastName":"Finnigan","homeAddress":"NULL","phoneNumber":"+44 0206 987-7467", "email": "seamus.finnegan@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Ginny","customerId":"7","workAddress":"9","lastName":"Weasley","homeAddress":"10","phoneNumber":"+44 0206 987-2728", "email": "ginny.weasley@hogwarts.ac.uk", "birthDate": "1981-08-11"},
  {"firstName":"Lee","customerId":"8","workAddress":"11","lastName":"Jordan","homeAddress":"NULL","phoneNumber":"+44 0206 987-9713", "email": "lee.jordan@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Fred","customerId":"9","workAddress":"12","lastName":"Weasley","homeAddress":"13","phoneNumber":"+44 0206 987-3971", "email": "fred.weasley@hogwarts.ac.uk", "birthDate": "1978-04-01"},
  {"firstName":"George","customerId":"10","workAddress":"14","lastName":"Weasley","homeAddress":"15","phoneNumber":"+44 0206 987-6431", "email": "george.weasley@hogwarts.ac.uk", "birthDate": "1978-04-01"},
  {"firstName":"Cho","customerId":"11","workAddress":"16","lastName":"Chang","homeAddress":"NULL","phoneNumber":"+44 0206 987-1793", "email": "cho.chang@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Luna","customerId":"12","workAddress":"NULL","lastName":"Lovegood","homeAddress":"NULL","phoneNumber":"+44 0206 987-7867", "email": "luna.lovegood@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Parvati","customerId":"13","workAddress":"NULL","lastName":"Patil","homeAddress":"NULL","phoneNumber":"+44 0206 987-2345", "email": "parvati.patil@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Padma","customerId":"14","workAddress":"NULL","lastName":"Patil","homeAddress":"NULL","phoneNumber":"+44 0206 413-5903", "email": "padma.patil@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Draco","customerId":"15","workAddress":"NULL","lastName":"Malfoy","homeAddress":"NULL","phoneNumber":"+44 0206 987-2216", "email": "draco.malfoy@hogwarts.ac.uk", "birthDate": "1980-06-05"},
  {"firstName":"Vincent","customerId":"16","workAddress":"NULL","lastName":"Crabbe","homeAddress":"NULL","phoneNumber":"+44 0206 987-9438", "email": "vincent.crabbe@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Gregory","customerId":"17","workAddress":"NULL","lastName":"Goyle","homeAddress":"NULL","phoneNumber":"+44 0206 987-1178", "email": "gregory.goyle@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Penelope","customerId":"18","workAddress":"NULL","lastName":"Clearwater","homeAddress":"NULL","phoneNumber":"+44 0206 987-9392", "email": "penelope.clearwater@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Justin","customerId":"19","workAddress":"NULL","lastName":"Finch-Fletchley","homeAddress":"NULL","phoneNumber":"+44 0206 987-1190", "email": "justin.finch-fletchley@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Ernie","customerId":"20","workAddress":"NULL","lastName":"Macmillan","homeAddress":"NULL","phoneNumber":"+44 0206 987-1059", "email": "ernie.macmillan@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Cedric","customerId":"21","workAddress":"NULL","lastName":"Diggory","homeAddress":"NULL","phoneNumber":"+44 0206 987-7715", "email": "cedric.diggory@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Millicent","customerId":"22","workAddress":"NULL","lastName":"Bulstrode","homeAddress":"NULL","phoneNumber":"+44 0206 987-4324", "email": "millicent.bulstrode@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Hanna","customerId":"23","workAddress":"NULL","lastName":"Abbott","homeAddress":"NULL","phoneNumber":"+44 0206 987-4300", "email": "hanna.abbott@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Susan","customerId":"24","workAddress":"NULL","lastName":"Bones","homeAddress":"NULL","phoneNumber":"+44 0206 987-6544", "email": "susan.bones@hogwarts.ac.uk", "birthDate": "1970-01-01"},
  {"firstName":"Fleur","customerId":"25","workAddress":"NULL","lastName":"Delacour","homeAddress":"NULL","phoneNumber":"+44 0206 987-9304", "email": "fleur.delacour@beauxbatons.fr", "birthDate": "1970-01-01"},
  {"firstName":"Viktor","customerId":"26","workAddress":"NULL","lastName":"Krum","homeAddress":"NULL","phoneNumber":"+44 0206 987-6317", "email": "viktor.krum@durmstrang-institut.de", "birthDate": "1970-01-01"}
]

customers.forEach(customer => {
    customer.customerId = getNextSequenceValue("customerId").toString();
    db.customers.insert(customer);
});

db.customers.find().pretty();
