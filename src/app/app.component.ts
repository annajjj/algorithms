import { Component, OnInit } from "@angular/core";
import {TweenLite, TimelineMax, Power1, TweenMax} from "gsap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  alphabet= new Array<Letter>();
  huffman = new Array();
  text;
  codedText;

  tl = new TimelineMax();

  ngOnInit(): void {
    this.tl.set(".dot1",{autoAlpha:0});
    this.tl.set(".dot2",{autoAlpha:0});
    this.tl.set(".dot3",{autoAlpha:0});

    this.tl
    .to('.dot1', 1, {autoAlpha:1, delay:1, repeat:-1, yoyo:true})
    .to('.dot2', 1, {autoAlpha:1, delay:1, repeat:-1, yoyo:true})
    .to('.dot3', 1, {autoAlpha:1, delay:1, repeat:-1, yoyo:true})
  }

  count(event){
    this.alphabet = new Array<Letter>();
    this.huffman = new Array<Letter>();
    
    this.createAlphabet(this.text);
    this.countFrequency(this.text)
    this.countHuffman();
    this.code(this.text);
  }
  createAlphabet(data){
    const uniqValues = new Set(data);
    uniqValues.forEach(el => this.alphabet.push(new Letter(el)))
  }

  countFrequency(text: string) {
    this.alphabet.forEach((el, i) => {
      const reg = new RegExp(el.label, "g");
      this.alphabet[i].propability = text.match(reg).length / text.length;
    });
  }

  countHuffman() {
    let tmpObj = [...this.alphabet.sort((a,b) => a.propability - b.propability)];
    this.huffman.push(tmpObj);
    if(this.alphabet.length == 1) this.alphabet[0].code = "1";
    for (let i = 0; Object.keys(this.huffman[this.huffman.length - 1]).length > 1; i++)
      tmpObj = [...this.createNewObj(tmpObj)];
  }


  code(text: string){
    let codedText = '';
    text.split('').forEach((letter) => codedText+= this.alphabet.find((el) => el.label == letter).code);

    this.codedText = codedText;
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
    newObj = newObj.sort((a,b) => a.propability -b.propability);
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
  propability: number
  code: string

  constructor(label, propability?){
    this.label = label;
    this.propability = propability;
    this.code = "";
  }

  addBit(bit: 0 | 1){
    this.code = bit + this.code;
  }



}