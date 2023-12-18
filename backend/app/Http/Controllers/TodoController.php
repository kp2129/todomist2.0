<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TodoController extends Controller
{
    public function show(){
        $tasks = Todo::all();
        return response()->json($tasks);
    }

    public function store(Request $request, Todo $task){
        $task->id = $request->id;
        $task->taskName = $request->taskName;
        $task->taskDescription = $request->taskDescription;
        $task->status = $request->status;
        $task->category = $request->category;
        $task->dueDate = $request->dueDate;

        if($task->save()){
            return response()->json([
                'message' => 'Task added sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }

    }
    public function destroy($id){
        $model = Todo::where('id', $id)->first();

        if($model){
            $model->delete();
            return response()->json([
                'message' => 'Task Id:'.$id.' deleted sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Task '.$id.' not found.']);
        }

    }
    public function update(Request $request, Todo $task, $id)
    {
        $sql=null;
        switch($request){
            case $request->taskName != null:
                if($request->taskName != null){
                    $sql['taskName'] = $request->taskName; 
                }
            case $request->taskDescription != null:
                if($request->taskDescription != null){
                    $sql['taskDescription'] = $request->taskDescription;
                }
            case $request->status != null:
                if($request->status != null){
                    $sql['status'] = $request->status;
                }
            case $request->dueDate != 0:
                if($request->dueDate != null){
                    $sql['dueDate'] = $request->dueDate;
                }
                break;
            default:
                return response()->json(['error' => 'Fill all parameters.']);
        }

        if(Todo::where('id', $id)->update($sql)){
            return response()->json([
                'message' => 'Task Id:'.$id.' updated sucessfuly'
            ]);
        }else{
            return response()->json(['error' => 'Task '.$id.' not found.']);
        }

    }

    public function search($query){
        
        if(empty($query)){
           return response()->json([]); 
        }

        // Perform the search using Eloquent
        $tasks = Todo::where('taskDescription', 'LIKE', "%$query%")->get();
        if($tasks){
            // Return the search results as JSON
            return response()->json($tasks);
        }else{
            return response()->json(['error' => 'Not Found'], 404);
        }
    }
}
