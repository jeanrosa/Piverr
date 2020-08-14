<template>
<div>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <a href="/" class="navbar-brand">Pivef</a>
        <ul class="navbar-nav">
            <li class="nav-item">   
                 <form class="form-inline" action="/">
                    <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
                    <input class="form-control mr-sm-2" type="text" placeholder="Search">
                    <button class="btn btn-success" type="submit">Search</button>
                </form>
            </li>
            <li>
                <template v-if="collapse === false">
                   <a @click="collapse = true" type="button" class="btn btn-info mb-3" data-toggle="collapse" data-target="#demo">Show Item</a>
               </template>
               <template v-else-if="collapse === true">
                   <a @click="collapse = false" type="button" class="btn btn-secondary mb-3" data-toggle="collapse" data-target="#demo">Hide Item</a>
               </template>
            </li>
            <li class="nav-item">
                <a @click="collapse = false" class="nav-link" data-toggle="collapse" data-target="#demo">Dashboard</a>
            </li>
            <li class="nav-item">
                <a @click="collapse = true" class="nav-link" data-toggle="collapse" data-target="#demo">New Task</a>
            </li>
        </ul>
    </nav>

    <div class="container h-100">
        <div name="taskItem" class="row pt-2">
            <div class="col-md-12">
               
               <div id="demo" class="collapse show">
                   <table class="table table table-striped">
                        <thead class="thead-dark">
                            <th>Task</th>
                            <th>Description</th>
                            <th>inicialized</th>
                            <th>finalized</th>
                            <th>Status</th>  
                            <th>Control</th>                    
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" :key="task._id">
                                <td><ins>{{task.title}}</ins></td>
                                <td><small>{{task.description}}</small></td>
                                <td><small>{{task.ini}}</small></td>
                                <td><small>{{task.fin}}</small></td>
                                <td><code>{{task.status}}</code></td>                         
                                <td class="float-right">
                                    <button class="btn btn-danger btn-sm" @click="deleteTask(task._id)">Delette</button>
                                    <button class="btn btn-secondary btn-sm"  @click="updateTask(task._id)">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div name="taskForm" class="row pt-2 pb-5">
           <div class="col-md-12">
               <div class="">
                   <div class="card-bodi">
                       <template v-if="edit === false">
                           <h3>New Task</h3>
                        </template>
                        <template v-else>
                            <h3>Edit Task</h3>
                        </template>
                       <form @submit.prevent="sendTask">
                           <section class="form-group">
                               <input type="text" 
                               name="title"
                               v-model="task.title" 
                               required="required"
                               placeholder="Insert a task" 
                               class="form-control">
                           </section>
                           <section class="form-group">
                               <textarea class="form-control" 
                               name="description"
                               id="" cols="30" rows="10" 
                               required="required"
                               placeholder="description task"
                               v-model="task.description">
                               </textarea>
                           </section>
                            <section class="form-group">
                              <small>last date: {{task.ini}}</small> 
                                <input type="date"
                                name="date"
                                v-model="task.ini"
                                class="form-control">
                            </section>
                            <section class="form-group">
                                <input type="time"
                                name="time"
                                v-model="task.fin"
                                class="form-control">
                            </section>
                           <section class="form-group">
                               <select v-model="task.status" name="status" id="" class="form-control">
                                   <option selected="selected" value="finalizado">Finalizado</option>
                                   <option value="Pendiente">Pendiente</option>
                               </select>
                           </section>   
                           <template v-if="edit === false">
                               <button class="btn btn-primary btn-block">Send</button>
                           </template>
                           <template v-else>
                               <button class="btn btn-info btn-block">Edit</button>
                           </template>
                       </form>
                   </div>
               </div>
           </div>
        </div>
    </div>   
</div>   
</template>

<script>

class Task{
    constructor(title, description, ini, fin, status){
        this.title = title;
        this.description = description;
        this.ini = ini;
        this.fin = fin;
        this.status = status;
    }
}


export default {
    components:{},
    data(){
        return{
            task: new Task(),
            tasks: [],
            edit: false,
            collapse: true,
            taskToEdit:''
        }
    },
    created(){
        this.getTask();
    },
    methods:{
        sendTask(){
            if (this.edit === false){
                fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(res => {
                    this.getTask();
                })
            }else{
                fetch('/api/tasks/' + this.taskToEdit, {
                    method: 'PUT',
                    body: JSON.stringify(this.task),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }    
                })
                .then(res => res.json())
                .then(data=> {
                    this.getTask();
                    this.edit = false;
                    });
            }        
            

            this.task = new Task();
        },
        getTask(){
            fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data;
                    //console.log(this.tasks);
                })
        },
        deleteTask(id){
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                body: JSON.stringify(this.task),
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }

            }) 
            .then(res => res.json())
            .then(res => this.getTask())
            

        },
        updateTask(id){
            fetch('/api/tasks/' + id)
            .then(res => res.json())
            .then(data => {
                this.task = new Task(data.title, data.description, data.ini, data.fin, data.status)
                this.taskToEdit=data._id;
                this.edit = true
            });
        }
    }
}
</script>