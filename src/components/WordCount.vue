<template>
  <b-container class="bv-example-row mb-5">
  <b-row>
    <b-col> 

      <b-form-textarea
      id="textarea"
      class="mt-5"
      v-model="text"
      placeholder="Enter something..."
      rows="6"
      max-rows="6"
    ></b-form-textarea>

    <b-button variant="success" class="mt-2" style="width: 100%;" @click="counWords" id="counwords">Count words</b-button>

  </b-col>
    <b-col> 

      <div  class="table-responsive-sm">
        <table role="table" aria-busy="false" aria-colcount="3" class="table b-table table-sm table-hover table-striped " >
          <thead role="rowgroup" class="">
            <tr role="row" class="">
              <th role="columnheader" scope="col" aria-colindex="1" class="">Word</th>
              <th role="columnheader" scope="col" aria-colindex="2" class="">Count</th>
              <th role="columnheader" scope="col" aria-colindex="3" class="">Action</th>
            </tr>
          </thead>
          <tbody role="rowgroup" id="resultbody">
            <tr v-for="(count, word) in words" v-bind:key="word">
              <td>"{{ word }}"</td>
               <td>{{ count }}</td>
               <td>
                 <b-button variant="danger" class="mt-2"  @click="removeWord(word)" :id="'w-'+word">Remove</b-button>
               </td>
            </tr>
          </tbody>
        </table>
      </div>


  </b-col>

  </b-row>
</b-container>
 
</template>




<script>
export default {
  name: 'WordCount',
  data() {
    return {
      text: 'asdsad. sadsd. dddd, ii, jjjj',
      words:{}
    };
  },
  methods: {
    stringToArray(text){
      text = text.replace(/[.,!?'"(){}[\]`:;]/g, " ");
     
      text=text.toLowerCase();
      return text.trim().split(" ");
    },
    removeWord(word){
      var tmp=this.words;
      delete tmp.[word];
      this.words=tmp;

      var rx = new RegExp("\\b" + word+ '\\b', "gi");
     // this.text = this.text.replace(rx, "$1" );
     var tmp_text = this.text;
     // remove selected word
      tmp_text = tmp_text.replaceAll(rx , '');
      //trim spaces
      tmp_text=tmp_text.replace(/\s+/g, ' ');
      //remove first character if is (, . ! ? ; : } ] )
      tmp_text=tmp_text.replace(/^(,|\.|!|\?|;|:|\]|\}|\)|>)/, '').trim();


      // tmp_text=tmp_text.replace(/(!|@|#|\$|%|\^|&|\*|\)|\(|\+|=|\.|<|>|\{|\}|\[|\]|:|;|'|"|\\|\||~|`|_|-)\s?(!|@|#|\$|%|\^|&|\*|\)|\(|\+|=|\.|<|>|\{|\}|\[|\]|:|;|'|"|\\|\||~|`|_|-)/g, function(matched){

      //replace multiple special character repeat
      tmp_text=tmp_text.replace(/(,|\.|!|\?|;|:|\[|\]|\{|\}|\(|\)|\(|\)|'|"|\\|\||~|`|_|-)\s?(,|\.|!|\?|;|:|\[|\]|\{|\}|\(|\)|\(|\)|'|"|\\|\||~|`|_|-)/g, function(matched){
        if (matched==", ," || matched==",," ) {
          return ", ";
        }else if (matched.startsWith(",")) {
          return ". ";
        }else
        if (matched=="( )" || matched=="()" ||
          matched=="\" \"" || matched=="\"\"" ||
          matched=="' '" || matched=="''" ||
          matched=="[ ]" || matched=="[]" ||
          matched=="{ }" || matched=="{}" ) {
          return "";
        }else{
          return matched.charAt(0);
        }
      });
      this.text=tmp_text;
     
    },
    counWords() {
      this.words={};
      if (this.text=="") {
        return;
      }

      var words=this.stringToArray(this.text);
      for (var i = 0; i<words.length ; i++) {
        var word=words[i];
        if (word==" " || word.trim()=="") {continue;}
        if (word in this.words) {
          this.words[word]++;
        }else{
          this.words[word]=1;
        }
      }

      
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
