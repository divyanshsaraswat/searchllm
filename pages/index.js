import { useState } from "react";
import { Noto_Sans } from "next/font/google";
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,GithubAuthProvider,signInAnonymously } from "firebase/auth";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
const noto = Noto_Sans({ subsets: ["latin"] });
const firebaseConfig = {
  apiKey: "AIzaSyCzYLX8mNtAtoMqTTznfSZWSr2k8Y9Oi3Q",
  authDomain: "search-llm-491db.firebaseapp.com",
  projectId: "search-llm-491db",
  storageBucket: "search-llm-491db.appspot.com",
  messagingSenderId: "1038036441609",
  appId: "1:1038036441609:web:cdb723aa4a47171ac6f6d8",
  measurementId: "G-MX3FZ36KZD"
};

export default function Home() {
  
  const queryClient = new QueryClient();
  const [mode,setmode]= useState('light');
  const [logged,setlogged] = useState(false);
  
  
  const [usercred,setusercred]=useState(['Anonymous User','user.png']);
  function Log(){
    
    
    
    function CallGoogle(){
      var user='';
      const app = initializeApp(firebaseConfig);
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        user = result.user;
        
        setusercred([user.displayName,user.photoURL]);
        console.log(user);
        setlogged(!logged);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      });
        
      }
      function Anonymous(){
        const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
   setlogged(!logged);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
      }
      function CallGithub(){
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const provider = new GithubAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    console.log(user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  });

      }
   
   
    const light=<> <path d="M25.5176 3.19395V3.76775C25.5176 5.97915 24.5371 7.04292 22.4951 7.04292C20.4532 7.04292 19.5538 5.97915 19.5538 3.76775V3.19395C19.5538 1.06377 20.4532 0 22.4951 0C24.5371 0 25.5176 1.06377 25.5176 3.19395ZM31.565 5.81408L31.9729 5.3215C33.1991 3.51884 34.6685 3.27517 36.2215 4.42017C37.8556 5.56779 38.1014 7.12153 36.8752 8.92418L36.3836 9.33292C35.1574 11.1356 33.688 11.3793 32.135 10.153C30.5009 9.00541 30.3388 7.61411 31.565 5.81408ZM13.0984 5.32412L13.4253 5.8167C14.6515 7.61936 14.4868 9.01065 12.9337 10.1556C11.2996 11.3845 9.74658 11.1382 8.52035 9.33554L8.19353 8.9268C6.96731 7.12415 7.13203 5.57041 8.68507 4.42279C10.3192 3.27517 11.8722 3.68653 13.0984 5.32412ZM22.4951 10.7268C29.4394 10.7268 35.16 16.4597 35.16 23.5C35.16 30.4591 29.4394 36.1107 22.4951 36.1107C15.4672 36.1107 9.83024 30.4617 9.83024 23.5C9.83024 16.4571 15.4672 10.7268 22.4951 10.7268ZM4.19327 14.3295L4.76586 14.4946C6.89149 15.1496 7.54513 16.3785 6.97254 18.3436C6.3189 20.3087 5.01162 20.8825 2.96966 20.2275L2.39707 20.0624C0.355105 19.4073 -0.382198 18.1785 0.190389 16.2134C0.844027 14.2483 2.1513 13.6745 4.19327 14.3295ZM40.2244 14.4946L40.797 14.3295C42.9226 13.6745 44.2299 14.2483 44.7999 16.2134C45.3699 18.1785 44.7188 19.4073 42.5932 20.0624L42.1017 20.2275C39.976 20.8825 38.6688 20.3087 38.0988 18.3436C37.4451 16.3785 38.1798 15.1496 40.2244 14.4946ZM22.4951 30.5429C26.3359 30.5429 29.5231 27.349 29.5231 23.5C29.5231 19.5698 26.3359 16.3759 22.4951 16.3759C18.5733 16.3759 15.3862 19.5698 15.3862 23.5C15.3862 27.349 18.5733 30.5429 22.4951 30.5429ZM2.39446 26.8564L2.96704 26.6913C5.00901 26.0363 6.31628 26.5263 6.96992 28.494C7.54251 30.4591 6.88887 31.6879 4.76324 32.343L4.19065 32.508C2.14869 33.1631 0.841412 32.6731 0.187774 30.7054C-0.384813 28.7403 0.352491 27.5114 2.39446 26.8564ZM42.1043 26.6939L42.5958 26.859C44.7214 27.514 45.3751 28.7429 44.8025 30.708C44.2299 32.6731 42.9226 33.1657 40.7996 32.5106L40.227 32.3456C38.1851 31.6905 37.4478 30.4617 38.1014 28.4966C38.674 26.5315 39.9813 26.0389 42.1043 26.6939ZM8.19615 38.0758L8.52297 37.5832C9.74919 35.7806 11.3022 35.6181 12.9363 36.7631C14.4894 37.9107 14.6515 39.302 13.4279 41.1021L13.101 41.5947C11.8748 43.3973 10.3218 43.5598 8.68768 42.4148C7.13464 41.2671 6.97254 39.8759 8.19615 38.0758ZM36.3836 37.5832L36.8752 38.0758C38.1014 39.8785 37.8556 41.2698 36.2215 42.4148C34.6685 43.5624 33.1991 43.3973 31.9729 41.5947L31.565 41.1021C30.3388 39.2994 30.5035 37.9081 32.1376 36.7631C33.6907 35.6155 35.1574 35.7806 36.3836 37.5832ZM25.5176 43.0698V43.7248C25.5176 45.9362 24.5371 47 22.4951 47C20.4532 47 19.5538 45.9362 19.5538 43.7248V43.0698C19.5538 40.8584 20.4532 39.7946 22.4951 39.7946C24.5371 39.7946 25.5176 40.8584 25.5176 43.0698Z" fill="white"/>  </>;   
    const dark=<> <path d="M25.5849 47C24.2732 46.9993 22.9634 46.907 21.6663 46.7238C15.9861 45.8826 10.7719 43.2801 6.85917 39.3334C2.94649 35.3867 0.561894 30.3243 0.0875309 24.9573C-0.386832 19.5904 1.0765 14.2297 4.24302 9.73425C7.40954 5.23885 12.0959 1.86901 17.5512 0.164757C18.135 -0.0210913 18.7626 -0.0503605 19.3632 0.0802554C19.9638 0.210871 20.5135 0.496167 20.95 0.903914C21.4231 1.3364 21.7588 1.88322 21.92 2.48364C22.0812 3.08405 22.0614 3.71455 21.863 4.30509C21.1137 6.58649 20.7786 8.96944 20.8714 11.3547C21.083 15.0959 22.3234 18.7223 24.4721 21.8825C26.6208 25.0427 29.605 27.6294 33.1354 29.3917C36.3153 31.0809 39.9038 31.9801 43.5596 32.0038C44.1962 32.012 44.8183 32.1833 45.3584 32.4989C45.8985 32.8146 46.3361 33.2627 46.6237 33.7946C46.9113 34.3265 47.038 34.922 46.9901 35.5165C46.9421 36.111 46.7214 36.6819 46.3517 37.1673C43.9605 40.2207 40.8335 42.7026 37.225 44.4111C33.6165 46.1197 29.6284 47.0067 25.5849 47ZM18.6186 2.63212C18.5565 2.63275 18.4949 2.64251 18.436 2.66106C15.0211 3.72226 11.922 5.52342 9.39082 7.91798C6.85963 10.3125 4.96787 13.2329 3.86945 16.4413C2.77103 19.6498 2.49698 23.0558 3.06961 26.3822C3.64224 29.7085 5.04536 32.8613 7.16482 35.584C9.28427 38.3067 12.0602 40.5224 15.2667 42.0508C18.4732 43.5792 22.0198 44.3771 25.6178 44.3797C29.2158 44.3822 32.7636 43.5893 35.9726 42.0654C39.1815 40.5416 41.961 38.3298 44.0849 35.6101C44.1516 35.5204 44.1904 35.4151 44.1968 35.3059C44.2033 35.1967 44.1771 35.088 44.1214 34.9919C44.0707 34.8874 43.9894 34.7983 43.8871 34.735C43.7847 34.6717 43.6654 34.6368 43.5427 34.6342C39.4184 34.61 35.369 33.5995 31.7787 31.6986C27.8232 29.7146 24.482 26.8075 22.0789 23.2589C19.6758 19.7103 18.2923 15.6406 18.0624 11.4441C17.9626 8.76643 18.3424 6.09197 19.186 3.53174C19.229 3.40203 19.2336 3.26385 19.1995 3.13187C19.1654 2.99988 19.0937 2.879 18.9922 2.78206C18.944 2.73472 18.886 2.69703 18.8218 2.67125C18.7576 2.64548 18.6884 2.63217 18.6186 2.63212Z" fill="black"/></>
    return(
      <div className={mode} style={{height:"100vh",width:"100vw",backgroundColor:mode=='dark'?'#101628':'white'}}>
      <button onClick={()=>{(mode=="dark"?setmode("light"):setmode("dark"))}} className="dark:text-white text-black absolute right-10 top-3 z-10">{mode}</button>
      <div style={{height:"100vh",width:"100vw"}} className="z-0 bg-transparent flex justify-center items-center">
        <div className=" border dark:text-white text-black flex flex-col items-center sm:w-2/5 w-full h-3/5 p-10 shadow-lg ">
        <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="justify-center">
<g clip-path="url(#clip0_4_22)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M78.4 50.4V39.2C78.4 36.1088 75.8912 33.6 72.8 33.6H39.2C36.1088 33.6 33.6 36.1088 33.6 39.2V72.8C33.6 75.8912 36.1088 78.4 39.2 78.4H95.2C98.2912 78.4 100.8 75.8912 100.8 72.8V16.8C100.8 13.7088 98.2912 11.2 95.2 11.2H16.8C13.7088 11.2 11.2 13.7088 11.2 16.8V95.2C11.2 98.2912 13.7088 100.8 16.8 100.8H106.4C109.491 100.8 112 103.309 112 106.4C112 109.491 109.491 112 106.4 112H11.2C5.0176 112 0 106.988 0 100.8V11.2C0 5.012 5.0176 0 11.2 0H100.8C106.988 0 112 5.012 112 11.2V78.4C112 84.588 106.988 89.6 100.8 89.6H33.6C27.4176 89.6 22.4 84.588 22.4 78.4V33.6C22.4 27.412 27.4176 22.4 33.6 22.4H78.4C84.588 22.4 89.6 27.412 89.6 33.6V56C89.6 62.188 84.588 67.2 78.4 67.2H56C49.8176 67.2 44.8 62.188 44.8 56C44.8 49.812 49.8176 44.8 56 44.8C62.188 44.8 67.2 49.812 67.2 56H72.8C75.8912 56 78.4 53.4912 78.4 50.4Z" fill="#3B158E" width={112} height={112}/>
</g>
<defs>
<clipPath id="clip0_4_22">
<rect width="112" height="112" fill="white"/>
</clipPath>
</defs>
</svg>

      <h1 className="text-4xl font-bold my-4 mb-5">SearchLLM</h1>
      <h4 className="font-bold my-2">Create account with</h4>
      <button className="border w-4/5 rounded-md hover:bg-zinc-100 dark:hover:bg-white dark:hover:text-black p-1 my-1 flex flex-row gap-5 justify-center" onClick={CallGoogle}><img src="google.png" width="30px"/>Sign in with Google</button>
      <button className="border w-4/5 rounded-md hover:bg-zinc-100 dark:hover:bg-white dark:hover:text-black p-1 my-1 flex flex-row gap-5 justify-center" onClick={CallGithub}><img src="github.png" width="25px"/>Sign in with Github</button>
      <button className="border bg-green w-4/5 rounded-md bg-black text-white dark:hover:bg-white dark:hover:text-black p-2 my-4 flex flex-row gap-5 justify-center" onClick={()=>{setlogged(!logged)}}>Sign in Anonymously</button>

        </div>
      </div>
   
  
     <div className="absolute  bottom-5 flex flex-col gap-1 w-full items-center sm:items-end pr-5">
      <div className="flex flex-row gap-5">
      <div>
<a href="https://github.com/divyanshsaraswat" target="_blank">      
<svg className="opacity-60 hover:opacity-100 cursor-pointer" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 0C20.9561 0 27 6.1964 27 13.8415C27 19.9556 23.1363 25.1423 17.7754 26.9743C17.091 27.1106 16.848 26.6784 16.848 26.3098C16.848 25.8535 16.8642 24.3632 16.8642 22.511C16.8642 21.2204 16.4322 20.3781 15.9476 19.9488C18.954 19.6059 22.113 18.4353 22.113 13.119C22.113 11.607 21.5892 10.3732 20.7225 9.40386C20.8629 9.05421 21.3259 7.64634 20.5902 5.74014C20.5902 5.74014 19.4589 5.36925 16.8817 7.15935C15.8031 6.8529 14.6475 6.69871 13.5 6.69331C12.3525 6.69871 11.1983 6.8529 10.121 7.15935C7.5411 5.36925 6.4071 5.74014 6.4071 5.74014C5.67405 7.64634 6.1371 9.05421 6.27615 9.40386C5.4135 10.3732 4.88565 11.607 4.88565 13.119C4.88565 18.4218 8.0379 19.6103 11.0363 19.96C10.6502 20.3056 10.3005 20.9152 10.179 21.8103C9.4095 22.164 7.4547 22.7761 6.2505 20.6607C6.2505 20.6607 5.53635 19.3307 4.18095 19.2335C4.18095 19.2335 2.8647 19.2161 4.08915 20.0747C4.08915 20.0747 4.9734 20.4999 5.58765 22.0997C5.58765 22.0997 6.3801 24.5701 10.1358 23.7331C10.1426 24.8901 10.1547 25.9804 10.1547 26.3098C10.1547 26.6757 9.9063 27.1039 9.23265 26.9756C3.86775 25.1464 0 19.957 0 13.8415C0 6.1964 6.0453 0 13.5 0Z" fill={mode=='dark'?"white":"black"}/>
</svg>
</a>

      </div>
      
      <div>
      <a href="https://www.instagram.com/imdivyanshmv/" target="_blank">    
      <svg className="opacity-60 hover:opacity-100 cursor-pointer" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.6667 22.6667C19.085 22.6667 22.6667 19.085 22.6667 14.6667C22.6667 10.2484 19.085 6.66669 14.6667 6.66669C10.2484 6.66669 6.66669 10.2484 6.66669 14.6667C6.66669 19.085 10.2484 22.6667 14.6667 22.6667ZM14.6667 20C17.6122 20 20 17.6122 20 14.6667C20 11.7212 17.6122 9.33335 14.6667 9.33335C11.7212 9.33335 9.33335 11.7212 9.33335 14.6667C9.33335 17.6122 11.7212 20 14.6667 20Z" fill={mode=='dark'?"white":"black"}/>
<path d="M22.6667 5.33337C21.9303 5.33337 21.3334 5.93033 21.3334 6.66671C21.3334 7.40308 21.9303 8.00004 22.6667 8.00004C23.4031 8.00004 24 7.40308 24 6.66671C24 5.93033 23.4031 5.33337 22.6667 5.33337Z" fill={mode=='dark'?"white":"black"}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.871947 4.36808C0 6.07937 0 8.31959 0 12.8V16.5333C0 21.0137 0 23.254 0.871947 24.9652C1.63893 26.4705 2.86277 27.6944 4.36808 28.4613C6.07937 29.3333 8.31959 29.3333 12.8 29.3333H16.5333C21.0137 29.3333 23.254 29.3333 24.9652 28.4613C26.4705 27.6944 27.6944 26.4705 28.4613 24.9652C29.3333 23.254 29.3333 21.0137 29.3333 16.5333V12.8C29.3333 8.31959 29.3333 6.07937 28.4613 4.36808C27.6944 2.86277 26.4705 1.63893 24.9652 0.871947C23.254 0 21.0137 0 16.5333 0H12.8C8.31959 0 6.07937 0 4.36808 0.871947C2.86277 1.63893 1.63893 2.86277 0.871947 4.36808ZM16.5333 2.66667H12.8C10.5158 2.66667 8.963 2.66875 7.76277 2.7668C6.59365 2.86232 5.99579 3.03545 5.57872 3.24796C4.57519 3.75929 3.75929 4.57519 3.24796 5.57872C3.03545 5.99579 2.86232 6.59365 2.7668 7.76277C2.66875 8.963 2.66667 10.5158 2.66667 12.8V16.5333C2.66667 18.8176 2.66875 20.3703 2.7668 21.5705C2.86232 22.7397 3.03545 23.3376 3.24796 23.7547C3.75929 24.7581 4.57519 25.574 5.57872 26.0853C5.99579 26.2979 6.59365 26.4711 7.76277 26.5665C8.963 26.6645 10.5158 26.6667 12.8 26.6667H16.5333C18.8176 26.6667 20.3703 26.6645 21.5705 26.5665C22.7397 26.4711 23.3376 26.2979 23.7547 26.0853C24.7581 25.574 25.574 24.7581 26.0853 23.7547C26.2979 23.3376 26.4711 22.7397 26.5665 21.5705C26.6645 20.3703 26.6667 18.8176 26.6667 16.5333V12.8C26.6667 10.5158 26.6645 8.963 26.5665 7.76277C26.4711 6.59365 26.2979 5.99579 26.0853 5.57872C25.574 4.57519 24.7581 3.75929 23.7547 3.24796C23.3376 3.03545 22.7397 2.86232 21.5705 2.7668C20.3703 2.66875 18.8176 2.66667 16.5333 2.66667Z" fill={mode=='dark'?"white":"black"}/>
</svg>
</a>
      </div>

      <div>
      <a href="https://twitter.com/ImDivyanshMV" target="_blank">           
<svg className="opacity-60 hover:opacity-100 cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M24.739 24.9333L15.0645 10.4017L15.081 10.4153L23.804 0H20.889L13.783 8.47733L8.14 0H0.495L9.5271 13.5671L9.526 13.566L0 24.9333H2.915L10.8152 15.5017L17.094 24.9333H24.739ZM6.985 2.26667L20.559 22.6667H18.249L4.664 2.26667H6.985Z" fill={mode=='dark'?"white":"black"}/>
</svg>
</a>

      </div>
      
     </div>
      <div className="font-medium  text-sm dark:text-white">@imdivyanshmv</div>
     </div>
   </div>
    );
  }
  function MainWindow(){
    const [inputuser,setinputuser]= useState();
    const [chat,setchat]= useState([]);
    const [process,setprocess]= useState(false);
    const [wikichecked,setwikichecked]= useState(false);
  async function LLMpart(input){
    const chatModel = new ChatOpenAI({
      openAIApiKey:'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',
      maxRetries:10,
      maxConcurrency:5,
      cache:true
    });
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["human", "{input}"],
]);



const outputParser = new StringOutputParser();
const llmChain = prompt.pipe(chatModel).pipe(outputParser);
const response= await llmChain.invoke({
  input:input
});

if(response){
  
  setprocess(false);
  setTimeout(setchat(chat=>[...chat,response]),2000);


}

    }


    function LoadingWindow(){
    return(
      
      <div className="w-full h-fit p-5 flex flex-rows gap-6 my-2">
        <div className="flex items-center">
          {/* <img src={usercred[1]} height='100px' width='100px'/> */}
        </div>
        <div className="min-w-2.5 rounded-lg  bg-gray-500" style={{minHeight:"3px"}}></div>
        </div>
       
    );

    }

    function SideBar(){
      return(
        <>
        <div className="h-full min-h-screen min-w-7 px-4 bg-transparent hidden border-r dark:bg-[#101628] dark:text-white sm:block">
        
        </div>
        </>
      );
    }
    function Bot(props){
      return(
        <div className="w-full rounded-md bg-gray-300 h-fit p-5 flex flex-rows gap-6 my-2 dark:bg-[#070911]">
          <div className="flex items-center">
          <svg width="25" height="25" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="justify-center">
<g clip-path="url(#clip0_4_22)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M78.4 50.4V39.2C78.4 36.1088 75.8912 33.6 72.8 33.6H39.2C36.1088 33.6 33.6 36.1088 33.6 39.2V72.8C33.6 75.8912 36.1088 78.4 39.2 78.4H95.2C98.2912 78.4 100.8 75.8912 100.8 72.8V16.8C100.8 13.7088 98.2912 11.2 95.2 11.2H16.8C13.7088 11.2 11.2 13.7088 11.2 16.8V95.2C11.2 98.2912 13.7088 100.8 16.8 100.8H106.4C109.491 100.8 112 103.309 112 106.4C112 109.491 109.491 112 106.4 112H11.2C5.0176 112 0 106.988 0 100.8V11.2C0 5.012 5.0176 0 11.2 0H100.8C106.988 0 112 5.012 112 11.2V78.4C112 84.588 106.988 89.6 100.8 89.6H33.6C27.4176 89.6 22.4 84.588 22.4 78.4V33.6C22.4 27.412 27.4176 22.4 33.6 22.4H78.4C84.588 22.4 89.6 27.412 89.6 33.6V56C89.6 62.188 84.588 67.2 78.4 67.2H56C49.8176 67.2 44.8 62.188 44.8 56C44.8 49.812 49.8176 44.8 56 44.8C62.188 44.8 67.2 49.812 67.2 56H72.8C75.8912 56 78.4 53.4912 78.4 50.4Z" fill="#3B158E"/>
</g>
<defs>
<clipPath id="clip0_4_22">
<rect width="112" height="112" fill="white"/>
</clipPath>
</defs>
</svg>

          </div>
          <div>{props.text}</div>
        </div>
      );
    }
    function User(props){
      return(
        <div className="w-5/6 h-fit p-5 flex flex-rows gap-6 my-2 rounded-md">
          <div className="flex items-center">
            <img src={usercred[1]} className=" rounded" height='25px' width='25px'/>
          </div>
          <div >{props.text}</div>
        </div>
      );
    }




    return(
      <>
      <div className={mode}>
      <div className="w-full h-full bg-transparent min-h-screen flex flex-rows justify-center overflow-y-hidden dark:bg-[#101628]">
      <button className=" absolute right-5 top-5 text-black hidden sm:block dark:text-white" onClick={()=>{mode=='light'?setmode('dark'):setmode('light')}}>
        {mode}
      </button>
    
     <div className="absolute left-2 z-20">
      <svg width="80px" height="80px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer opacity-60 hover:opacity-100 hidden">
<path d="M5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM19.5 9.25C19.9142 9.25 20.25 8.91421 20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75V9.25ZM5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM17.5 13.25C17.9142 13.25 18.25 12.9142 18.25 12.5C18.25 12.0858 17.9142 11.75 17.5 11.75V13.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM12.5 17.25C12.9142 17.25 13.25 16.9142 13.25 16.5C13.25 16.0858 12.9142 15.75 12.5 15.75V17.25ZM5.5 9.25H19.5V7.75H5.5V9.25ZM5.5 13.25H17.5V11.75H5.5V13.25ZM5.5 17.25H12.5V15.75H5.5V17.25Z" fill={mode=="dark"?"white":"black"}/>
</svg>
</div>
      <div className="absolute left-0"><SideBar/></div>


      <div className="min-h-full h-full max-h-full bg-white dark:bg-[#101628] dark:text-white w-full flex flex-col py-3 gap-3 bg-gray-200 sm:w-4/5">
      <div style={{minHeight:"85vh",height:"85vh"}} className="w-full snap-end overflow-y-auto pl-5 pr-1">
      <Bot text='Welcome! How can I help you?'/>
       
        {chat.map((event,index)=>{
           if(index%2==0){
            return <User text={event}/>;
           }
           else{
            return <Bot text={event}/>;
           }
        })}
        
        {/* <LoadingWindow/> */}
       
      </div>

      <div className="hidden"><input type="checkbox" id="wikipedia" name="wikipedia" value="Wikipedia" className="mr-1 ml-6" onChange={e=>{e.target.checked?setwikichecked(true):setwikichecked(false)}}/>Wikipedia</div>
      
      <div className="w-full h-fit flex items-end px-5  gap-4 sticky ">
      
       <textarea className="w-5/6 flex-grow py-2 px-3 rounded-md dark:bg-[#070911] bg-gray-200" placeholder="Type anything..." onChange={e=>{setinputuser(e.target.value)}} id="textinput"/>
        <button className="bg-green-700 text-white rounded-md p-5 disabled:bg-gray-400" disabled={process} onClick={()=>{setchat([...chat,inputuser]);setprocess(!process);document.getElementById('textinput').value='';;setTimeout(2000);LLMpart(inputuser)}}>Send</button>
      </div>

      </div>




      </div>
      </div>
      </>
    );
  }
  if(!logged){
    return <Log/>;
  }
  else{
    return (
      <QueryClientProvider client={queryClient}>
    <MainWindow/>
    </QueryClientProvider>
    
    );
  }
  
}
