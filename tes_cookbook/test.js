var buff = new Buffer(JSON.parse(`{ "type": "Buffer",
  "data": 
   [ 72,
     111,
     108,
     97,
     32,
     77,
     117,
     110,
     100,
     111,
     32,
     98,
     108,
     97,
     32,
     98,
     108,
     97 ] }`));
	 
console.log(buff);
console.log(buff.toString());