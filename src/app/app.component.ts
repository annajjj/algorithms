import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  alphabet = ["A", "B", "C", "D", "E", "F"];
  lettersFrequency = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0
  };

  lettersCode = {
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: ""
  };

  alphabet2= []
  huffman = [];

  ngOnInit(): void {
    // this.countFrequency("ABBCCFFEEEECDDDE");
    // this.countHuffman();
    this.createAlphabet("AAAAABBBBCCCDDEABABA");
  }

  createAlphabet(data){
    const uniqValues = new Set(data);
    uniqValues.forEach((el,i) => this.alphabet2.push(new Letter(el)))
    this.countFrequency2('AAAAABBBBCCCDDEABABA')
    this.countHuffman2();
    console.log(this.alphabet2)
  }

  countFrequency2(text: string) {
    this.alphabet2.forEach((el, i) => {
      const reg = new RegExp(el.label, "g");
      this.alphabet2[i].propabilty = text.match(reg).length / text.length;
    });
  }


  countFrequency(text: string) {
    this.alphabet.forEach((el, i) => {
      const reg = new RegExp(el, "g");
      this.lettersFrequency[el] = text.match(reg).length / text.length;
    });
  }

  
  countHuffman2() {
    let tmpObj = this.sortObject2(this.alphabet2);
    this.huffman.push(tmpObj);
    console.log(this.huffman);
    for (let i = 0; Object.keys(this.huffman[this.huffman.length - 1]).length > 1; i++)
      tmpObj = this.createNewObj2(tmpObj);

    console.log(this.huffman);
    // console.log(this.lettersCode);
  }

  countHuffman() {
    let tmpObj = this.sortObject(this.lettersFrequency);
    this.huffman.push(tmpObj);
    for (let i = 0; Object.keys(this.huffman[this.huffman.length - 1]).length > 1; i++)
      tmpObj = this.createNewObj(tmpObj);

    console.log(this.huffman);
    console.log(this.lettersCode);
  }

  private createNewObj(sortedObject: {}) {
    let newObj = {};
    for (let i = 0; i < Object.keys(sortedObject).length; i++) {
      const key = Object.keys(sortedObject);
      if (i === 0) {
        this.addBits(sortedObject);
        newObj[key[0] + key[1]] = sortedObject[key[0]] + sortedObject[key[1]];
      }
      else if (i != 1) newObj[key[i]] = sortedObject[key[i]];
    }
    newObj = this.sortObject(newObj);
    this.huffman.push(newObj);
    return newObj;
  }

  private createNewObj2(sortedObject) {
    let newObj = new Array<Letter>();
    for (let i = 0; i < sortedObject.length; i++) {
      if (i === 0) {
        this.addBits2(sortedObject);
        newObj.push(new Letter(sortedObject[0].label + sortedObject[1].label, sortedObject[0].propabilty + sortedObject[1].propabilty));
      }
      else if (i != 1) newObj.push(new Letter(sortedObject[i].label, sortedObject[i].propabilty));

    }
    newObj = this.sortObject2(newObj);
    this.huffman.push(newObj);
    return newObj;
  }

  private sortObject(data) {
    return Object.keys(data)
      .sort((a, b) => data[a] - data[b])
      .reduce((newObj, i) => {
        newObj[i] = data[i];
        return newObj;
      }, {});
  }

  private sortObject2(data) {
    return data.sort((a,b)=> a.propabilty - b.propabilty);
  }

  private addBits(obj) {
    this.alphabet.forEach((el, i) => {
      if (Object.keys(obj)[0].indexOf(el) > -1)
        this.lettersCode[el] = "0" + this.lettersCode[el];
      else if (Object.keys(obj)[1].indexOf(el) > -1)
        this.lettersCode[el] = "1" + this.lettersCode[el];
    });
  }

  private addBits2(obj) {
    this.alphabet2.forEach((el, i) => {
      if (obj[0].label.indexOf(el.label) > -1)
        this.alphabet2[i].addBit("0")
      else if (obj[1].label.indexOf(el.label) > -1)
        this.alphabet2[i].addBit("1")
    });
  }
}

export class Letter{
  label: string
  propabilty: number
  code: string

  constructor(label, propability?){
    this.label = label;
    this.propabilty = propability;
    this.code = "";
  }

  addBit(bit: 0 |1){
    this.code = bit + this.code;
  }


}