import fs from 'fs';
import { parse } from 'csv-parse';

const data = []
fs.createReadStream('./data.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', (r) => {
    // console.log(r);
    data.push(r);        
  })
  .on('end', () => {
    console.log(data);
    let totalTime = 0;
    data.forEach((item) => {
        const t0 = item[0]
        const t1 = item[1]
        const t2 = item[2]
        const t3 = item[3]
        const t4 = item[4]

        let [h1, m1] = t1.split(':')
        let [h2, m2] = t2.split(':')
        let [h3, m3] = t3.split(':')
        let [h4, m4] = t4.split(':')
        //console.log(h1, ' ', m1, ' ', h2, ' ', m2, ' ', h3, ' ', m3, ' ', h4, ' ', m4)

        let h1Num = parseInt(h1)
        let h2Num = parseInt(h2)
        let h3Num = parseInt(h3)
        let h4Num = parseInt(h4)

        let m1Num = parseInt(m1)
        let m2Num = parseInt(m2)
        let m3Num = parseInt(m3)
        let m4Num = parseInt(m4)

        if(h2Num < h1Num) {
            h2Num = 12 + h2Num
        }
        const d1 =( h2Num - h1Num) * 60 + (m2Num - m1Num)

        if(h4Num < h3Num) {
            h4Num = 12 + h4Num
        }
        const d2 = (h4Num- h3Num) * 60 + (m4Num - m3Num)

        totalTime = totalTime + d1 + d2
        console.log(`${t0}, ${t1}, ${t2}, ${t3}, ${t4}, ${d1+d2}`)
    });
    console.log(totalTime)

  })
