import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  alphabet= new Array<Letter>();
  huffman = new Array();
  text;

  ngOnInit(): void {
    this.createAlphabet("AAAAABBBBCCCDDEABABA");
    this.countFrequency('AAAAABBBBCCCDDEABABA')
    this.countHuffman();
    console.log(this.huffman)
  }

  count(event){
    console.log(event)
  }
  createAlphabet(data){
    const uniqValues = new Set(data);
    uniqValues.forEach(el => this.alphabet.push(new Letter(el)))
  }

  countFrequency(text: string) {
    this.alphabet.forEach((el, i) => {
      const reg = new RegExp(el.label, "g");
      this.alphabet[i].propabilty = text.match(reg).length / text.length;
    });
  }

  countHuffman() {
    let tmpObj = [...this.alphabet.sort((a,b) => a.propabilty - b.propabilty)];
    this.huffman.push(tmpObj);
    for (let i = 0; Object.keys(this.huffman[this.huffman.length - 1]).length > 1; i++)
      tmpObj = [...this.createNewObj(tmpObj)];
  }

  private createNewObj(sortedObject) {
    let newObj = new Array<Letter>();
    for (let i = 0; i < sortedObject.length; i++) {
      if (i === 0) {
        this.addBits(sortedObject);
        newObj.push(new Letter(sortedObject[0].label + sortedObject[1].label, sortedObject[0].propabilty + sortedObject[1].propabilty));
      }
      else if (i != 1) newObj.push(new Letter(sortedObject[i].label, sortedObject[i].propabilty));
    }
    newObj = newObj.sort((a,b) => a.propabilty -b.propabilty);
    this.huffman.push(newObj);
    return newObj;
  }

  private addBits(obj) {
    this.alphabet.forEach((el, i) => {
      if (obj[0].label.indexOf(el.label) > -1)
        this.alphabet[i].addBit(0)
      else if (obj[1].label.indexOf(el.label) > -1)
        this.alphabet[i].addBit(1)
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

  addBit(bit: 0 | 1){
    this.code = bit + this.code;
  }


}