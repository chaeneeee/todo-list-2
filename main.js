// 유저 메모 입력
// 플러스 버튼 누르면 할일이 추가 
// delete 버튼을 누르면 할일 삭제
// check 버튼을 누르면 할일 이 끝나면서 밑줄 그어짐
// 1.check 버튼을 클릭하는 순간 true 를 false 로 바꾸기 \
// 2. true 면 끝난걸로 간주하고 밑줄 보여주기 
// 3. false 면 진행중인걸로 간주하고 그대로 
// 진행중 끝남 탭을 누르면 언더바 이동
// 끝남 탭은 끝난 아이템만 진행중은 진행중 아이템만 보여줘야한다
// 전체탭은 전체아이템을 보여줘야 한다.


// html의 아이디값을 가져오는 것 
let taskInput =document.getElementById("task-input");
let addButton =document.getElementById("add-button");
let tabs= document.querySelectorAll(".task-tabs div")
let taskList = []
let mode = "all"
let filterList =[]
let underLine = document.getElementById("under-line");
// 초기값은 모두보여주는 것이니 all 
// 클릭이던 event 값을 주기위해서는 addEventLister 를 해야함 ( 이벤트 + 새로만드는 함수값)
addButton.addEventListener("click",addTask)

// under bar 빼야하니까 1부터 tabs 는 언더바 all 진행중 끝남 4가지 가지고 있음 
// filter 인데 event 함수를 준다 고유 id 가져오기 위해 그래서 filter 함수를 만들어준다 .
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
//  엔터를 누르면 task 추가 
taskInput.addEventListener("keypress", function(event) {
    // 엔터 키는 13
    if (event.keyCode === 13) {
        event.preventDefault(); 
        addTask(); 
    }
});

// 할일이 추가되어야하는데 어디에 추가되는거지 ?? 그래서 추가되는 할일들의 arr를 추가해야한다! 
// taskList 가 추가할 arr를 askList에 푸시 넣어준다 taskContnet 를 
function addTask(){
    if (taskInput.value==="") { alert("할 일을 작성해주세요"); 
}
    let todo ={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(todo);
    console.log(taskList);
    filter()
 
}

// taskContent 가 끝난건지 진행중인건지 등 추가 정보를 넣어주고 싶다면 객체를 써야한다. 
// 그 추가정보가 들어간 게 todo 
// 객체화하면 string 이 아니라 object 출력 그래서 input 값인 taskContent 만 출력해야한다.


// render 그리다 task 의 arr를 하나씩 그린다고 생각
// render이 taskList만 받을 때에는 밑에 만든 filterList를 받지 못한다 
// 그래서 조금 변경해주어야한다. 1. 내가 선택한 탭에 따라서 
// 2. 리스트를 달리보여준다 all =tasklist 그대로 보여줘도 ok ongoing 이나 done은 filterList 보여줘야함
function render(){
    let list=[]
    if(mode==="all"){
        list = taskList;
    }else if(mode ==="ongoing" ||  "done"){
        list=filterList
    }
    let resultHTML =''
    //  HTML에서 task들의 부모 div의 id를 넣어준다 
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete==true){
            resultHTML+=`<div class="task">
            <div class="task-done"> ${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"class="button"><i class="fa-solid fa-rotate-left"></i></button>
                <button onclick="deleteTask('${list[i].id}')"class="button"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;
        }else{ 
            resultHTML += `<div class="task">
        <div> ${list[i].taskContent}   </div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')" class="button"> <i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')" class="button"> <i class="fa-solid fa-trash-can"></i></button>
        </div>
    </div>`;
    //   add event 넣지 않고 바로 button 에 클릭 이벤트 주는 방법  button onclick
    }
    }
   
    document.getElementById("task-board").innerHTML= resultHTML
    // 테스크의 부모 div의 innerHTML을 가져와서 resultHTML에 넣어주는 것 
    
}
// 체크버튼의 클릭 이벤트로 실행되는 toggleComplete 함수는 내가 몇번째 task에 체크 버튼을 눌렀는지 모른다.
// 내가 몇번째의 task 에 check 버튼을 클릭했는지 알려주기 위해 각각 id를 주기 
// let todo 에 고유 id 값주기 
// generate random id javascript
function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
        taskList[i].isComplete= !taskList[i].isComplete;
        break;
    }
    }
    filter();
    // ui 업데이트
   
// !taskList[i].isComplete; !=아니다 ! 는 지금 갖고 있는 값의 반대를 데려온다 false 면 true 를 true면 false를
}


function deleteTask(id){
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id==id){
        filterList.splice(i,1)
        break;
    }
    }
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
        taskList.splice(i,1)
        break;
    }
    }
    render();
}
// tasklist 와 filter 리스트 구분되어있어서 
// 각 list 에서 삭제할 수 있도록 
// how to remove item form array javascript
// splice (시작점 몇개의 아이템)



// event 는 addeventlistner 로 받아 무엇을 클릭했는지 알려주는 것 중요!
// 슬라이딩 under-bar 만들기 
function filter(event) {
    if(event){
     mode =event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";   
    }
     filterList =[]
    if(mode==="all"){ render()
}else if(mode ==="ongoing"){
    // 진행중인 아이템을 보여준다 
    // task iscomplete=false
    for(let i=0; i<taskList.length; i++){
    if(taskList[i].isComplete===false){filterList.push(taskList[i])
    }
    }
  render()

   
} else if (mode==="done"){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete===true){filterList.push(taskList[i])
        }


}  render();
} 
    
}
// "filter",event.target.id 이벤트로 클릭한 타겟을 가져온다 근데 타겟의 id값만 가져온다 



// 랜덤id생성 함수 
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9); }