// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Factory function
const pAequorFactory = (num, array) => {
  return {
    specimenNum : num,
    dna : array,
    mutate() {
      let newBase = returnRandBase();
      let index = Math.floor(Math.random() * this.dna.length);
      while (this.dna[index] === newBase){
        newBase = returnRandBase();
        }
      this.dna[index] = newBase;
      },
    compareDNA(anotherSpecimen){
      let equalDNAInstances = 0;
      let percentage;
      for (let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === anotherSpecimen.dna[i])
          equalDNAInstances ++;
      }
      percentage = equalDNAInstances / 15 * 100;
      console.log(`specimen${this.specimenNum} and specimen${anotherSpecimen.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive() {
      let instancesOfCAndG = 0;
      this.dna.forEach(DNABase => {
        if(DNABase === 'C' || DNABase === 'G')
          instancesOfCAndG++;
      });
      if(instancesOfCAndG / this.dna.length * 100 > 60)
        return true;
      else
        return false;
    },
    complementStrand() {
      const complement = this.dna.map(DNABase => {
        if(DNABase === 'A')
          return 'T';
        else if(DNABase === 'C')
          return 'G';
        else if(DNABase === 'T')
          return 'A';
        else if(DNABase === 'G')
          return 'C';
        else 
          return 'Unexpected values.';
      });
      return complement;
    }
  }
}

const specimen1 = (pAequorFactory(1, mockUpStrand()));
const specimen2 = (pAequorFactory(2, mockUpStrand()));

console.log(specimen1);
console.log(specimen2);

// Testing methods 
specimen1.mutate();
console.log(specimen1);
console.log(specimen1.complementStrand());
specimen1.compareDNA(specimen2);

console.log(specimen1.willLikelySurvive());



const createSpecimens = numberOfSpecimens => {
  const specimenArray = [];
  let currentSpecimen; 
  let i = 0;
  while (specimenArray.length < numberOfSpecimens){
    currentSpecimen = pAequorFactory(i, mockUpStrand());
  if (currentSpecimen.willLikelySurvive() === true){
    specimenArray.push(currentSpecimen);
    i++;
  }
  }
  return specimenArray;
}

//console.log(createSpecimens(6)); 
 // Finding the specimens with the most similar DNA in a given array sample

 const findSimilar = array => {
  for (let i = 0; i < array.length; i++){
    for (let j = i + 1; j < array.length; j++){
      array[i].compareDNA(array[j]);
    }

  }
 }
 
 const sample = createSpecimens(6);
 findSimilar(sample);














