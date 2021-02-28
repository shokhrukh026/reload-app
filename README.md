# Documentation

First we need to add function that checks every 10 minute whether update is available or not. In my case it checks every 30 seconds. 

```
mounted: function () {
  window.setInterval(() => {
    this.getNotifications()
  }, 30000)
},

```
In the above code we call getNotifications function every 30 seconds.

```
async getNotifications(){
  let response = await this.CHECK_VERSION();
  //Status check for updates. If status verified true then update.
  if(response.status.verified == true){ 
    this.dialog = !this.dialog;
  }
},
    
```

Inside getNotifications function we need to send request to the backend and check whether update is available. Response should be like this {update: true}.
Below is the function that sends request to backend server and gets response from it.
```
import axios from 'axios';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat';

export default{
    state:{

    },
    mutations:{
       
    },
    actions: {
        async CHECK_VERSION(){
          return await axios({
            method: "GET",
            url: baseUrl,
          })
          .then(async (e) => {
              // console.log(e.data);
              return e.data;
          })
          .catch((error) => {
              console.log(error);
              return 'error';
          })
        }
    },
    getters:{

    }
}
```

Then we need to add dialog popup to our page. The following is the dialog which asks user to update the page (it should pop up automatically when update is available).

```
  <q-dialog
    v-model="dialog"
  >
    <q-card style="width: 300px">
      <q-card-section class="bg-warning text-white">
        <div class="text-h6">Update available</div>
      </q-card-section>

      <q-card-section class="q-pt-none bg-warning text-white">
        Do you want to update?
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="No" v-close-popup />
        <q-btn flat label="Yes" v-close-popup @click="refresh"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
```

If user presses yes button inside dialog, page should be refreshed automatically. The following is the function used for refreshing page. 

```
async refresh(){
  await this.$router.go();
}
```   
    
 


