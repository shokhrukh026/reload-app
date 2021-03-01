# Documentation
1) When application is created Created() hook called and all the functions inside it. We call pollData function when first application is created();
```
created () {
  this.pollData();
},
```
2) Then inside pollData function we set Interval to 25 seconds for testing purposes. You should set to about 5,10,15 or more minutes(I suppose it is better to do not set less than 5 minutes). Inside interval we call other function.
```
pollData () {
  this.polling = setInterval(async () => {
    await this.getNotifications()
  }, 25000)
},

```
3) This is our datas list
```
data() {
  return {
    leftDrawerOpen: false,
    dialog: false,
    polling: null,
    totallyNotUpdate: false,
  }
},
```
4) Here we catch versionData object from sessionStorage and parse it and afterwards assign its value to data object. Then in the second if statement we check whether user pressed no for update totally(it is done when dialog pops up first time and user answers no for update). Then client sends request to backend server by specified api url and in response if update required then dialog should pop up.
```
async getNotifications(){
 let data = {version: '0.0.0.'};
  if(sessionStorage.getItem('versionData')){
    data = JSON.parse( sessionStorage.getItem('versionData') );
  }

  if(!this.totallyNotUpdate){
    let response = await this.CHECK_VERSION(data);
    if(response.updateRequired == true){ 
      this.dialog = !this.dialog;
    }
  }
},
```
5) We need to add BeforeDestroy function
```
beforeDestroy () {
  clearInterval(this.polling);
},
```

6) Below is the function that sends request to backend server and gets response from it.
```
import axios from 'axios';

const baseUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat'; // change url to your backend api's url for checking updates

export default{
    state:{

    },
    mutations:{
       
    },
    actions: {
         async CHECK_VERSION({commit, getters}, payload){
            return await axios({
              method: "GET",
              url: baseUrl,
              // headers: {Authorization: getters.getUser.token},
              data: payload,
            })
            .then(async (e) => {
              //   Below one line code used for testing purposes. If you want to test then uncomment it.
              //   e.data = {version: '0.1.1.', updateRequired: true};
                sessionStorage.setItem('versionData', JSON.stringify(e.data));
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

7) Then we need to add dialog popup to our page. The following is the dialog which asks user to update the page (it should pop up automatically when update is available).

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
        <q-btn flat label="No" v-close-popup @click="totallyNotUpdate = true"/>
        <q-btn flat label="Yes" v-close-popup @click="refresh"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
```

8) If user presses yes button inside dialog, page should be refreshed automatically. The following is the function used for refreshing page. 

```
async refresh(){
  await this.$router.go();
}
```   
    
 
 
 
# ------------------------------------
Backend api example (node, Express)
```
router.get('/version/check', verifyToken, async (req, res) => {
    try {
        let latestVersion = await LatestVersion.find()

        if(latestVersion == req.body.version){
            res.status(201).json({version: latestVersion, updateRequired: false})
        }else{
            res.status(201).json({version: latestVersion, updateRequired: true})
        }
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
```


