<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Str;

Route::post('deleteProspect', function(Request $request){
     $user_id = $request->get('user_id');
     $profile_link = $request->get('profile_link');
     
     DB::table('leads')->where('user_id',$user_id)->where('profile_link',$profile_link)->delete();
     DB::table('comments')->where('user_id',$user_id)->where('profile_link',$profile_link)->delete();
     return '200';
});

Route::get('getComments', function(Request $request){
     $user_id = $request->get('user_id');
     $profile_link = $request->get('profile_link');
     
     $comments = DB::table('comments')->where('profile_link',$profile_link)->where('user_id',$user_id)->get();
     return json_encode($comments);
});

Route::post('addComment', function(Request $request){
    DB::table('comments')->insert([
        'user_id' => $request->user_id,
        'profile_link' => $request->profile_link,
        'comment' => $request->comment,
        ]);
        
    return '200';    
});


Route::get('linkingids',function(Request $request){
    $user_id = $request->get('user_id');
    $links = DB::table('linking')->where('link',$user_id)->select('id','link','link_id','user_id')->get();
    return $links;
});

Route::get('shareAccept', function(Request $request){
        $user_id = $request->get('user_id');
        $email = $request->get('email');
        $link_id = $request->get('link_id');
        // return $link_id;
        $check = DB::table('linking')->where('user_id',$user_id)->where('link',$email)->first();
        
        if(isset($check)){
            return 'Already has Access';
        }
        
        DB::table('linking')->insert([
            'user_id' => $user_id,
            'link' => $email,
            'link_id' => $link_id,
            ]);
        
        return 'Access Granted Successfully';
});

Route::get('share',function(Request $request){
    $user_id = $request->get('user_id');
    $email = $request->get('email');
    $link_id = $request->get('link_id');
    
    $check = DB::table('users')->where('username',$email)->first();
    if(!isset($check)){
        return '400';
    }

        $to_name = 'Purse Networking Member';
        $to_email = $email;
        $data = array('email'=>$email, 'user_id' => $user_id, 'link_id' => $link_id);
        Mail::send('email', $data, function($message) use ($to_name, $to_email) {
        $message->to($to_email, $to_name)
        ->subject('Database Request');
        $message->from('test@test.com','Pursue Networking');
        });
    
    return '200';
});


 Route::post('/event-save',function(Request $request){
        $user_id = $request->user_id;
        $notes = $request->notes;
        $status = $request->status;
        $conversion = $request->conversion;
        $discovery_call = $request->discovery_call;
        $endorsement = $request->endorsement;
        $priority = $request->priority;
        $total_messages = $request->total_messages;
        $follow_up = $request->follow_up;
        $profile_link = $request->profile_link;
        $weekly_source = $request->weekly_source;
        $weekly_date = $request->weekly_date;
        
        $check = DB::table('leads')->where('profile_link',$profile_link)->where('user_id',$user_id)->first();

        if(isset($check)){
           DB::table('leads')->where('profile_link',$profile_link)->where('user_id',$user_id)->update([
                'notes' => $notes,
                'status' => $status,
                'follow_up' => $follow_up,
                'conversion' => $conversion,
                'discovery_call' => $discovery_call,
                'priority' => $priority,
                'endorsement' => $endorsement,
                'total_messages' => $total_messages,
                'profile_link' => $profile_link,
                'weekly_source' => $weekly_source,
                'weekly_date' => $weekly_date,
               ]);
           
           
           
           return '200';
        }
        
        return '200';
});


Route::get('filters-all/{user_id}', function($user_id){
     $records = DB::table('leads')->where('user_id',$user_id)->select('id','name','image','weekly_source')->get();
      return json_encode($records);
});

Route::get('filters', function(Request $request){
    
    $user_id = $request->get('user_id');
    $id = $request->get('status');
    $weekly_source = $request->get('weekly');
    $priority = $request->get('priority');
    $follow_up = $request->get('follow_up');
    $discovery = $request->get('discovery');
    $search_box = $request->get('search_box');
    
      
    $where = array();
    
    if($id != 'Select'){
        $a = ["status",'=',$id];
        array_push($where,$a);
    }
    if($weekly_source != null){
        $a = ["weekly_source",'=',$weekly_source];
        array_push($where,$a);
    }
    if($priority != 'Select'){
        $a = ["priority",'=',$priority];
        array_push($where,$a);
    }
    if($follow_up != null){
        $a = ["follow_up",'=',$follow_up];
        array_push($where,$a);
    }
    if($discovery != null){
        $a = ["discovery_call",'=',$discovery];
        array_push($where,$a);
    }
    if($search_box != null){
        $a = ['name', 'LIKE', '%' . $search_box . '%'];
        array_push($where,$a);
    }
    
    // return $where;
      
    $records = DB::table('leads')->where('user_id',$user_id)->where($where)->orderBy('id','desc')->get();
    
    return json_encode($records);
});

Route::post('addCategory',function(Request $request){
    $check = DB::table('categories')->where('name',$request->name)->first();
    if(isset($check)){
        return '400';
    }
    
    DB::table('categories')->insert([
        'name' => $request->name,
        ]);
        
    return '200';    
});

Route::get('getFilterWeeks/{user_id}', function($user_id){
    $tags = DB::table('leads')->where('user_id',$user_id)->select('weekly_source')->groupBy('weekly_source')->get();
    return json_encode($tags);
});

Route::get('getAllCategories', function(){
    $categories = DB::table('categories')->orderBy('name','asc')->get();
    return json_encode($categories);
});

Route::get('getAllUsers',function(){
    $users = DB::table('users')
    ->leftJoin('leads', 'users.id', '=', 'leads.user_id')
    ->where('users.username','!=','admin1')
    ->select('users.id as id', 'users.username as username', DB::raw("count(leads.id) as count"))
    ->groupBy('users.username','users.id')
    ->orderBy('users.username','asc')
    ->get();
    // $users = DB::table('users')->where('username','!=','admin1')->select('username','id')->get(); 
    return json_encode($users);
});


Route::post('alreadyStored', function(Request $request){
   
    $check = DB::table('leads')->where('user_id',$request->user_id)->where('profile_link',$request->id)->first();
    if(isset($check)){
        return json_encode($check);
    }
    
    return '400';
    
});

Route::get('access_token/{access_token}',function($access_token){
    $user = DB::table('users')->where('access_token',$access_token)->select('id','username')->first();
    
    if(isset($user)){
        return json_encode($user);
    }
    return '400';
    
});

Route::post('login',function(Request $request){
    $username = $request->username;
    $password = $request->password;
    
        
    if(Auth::attempt(['username'=> $username, 'password' => $password])){
        
        // To keep user logged in
        $access_token = Str::random(15);
        DB::table('users')->where('username',$username)->update([
            'access_token' => $access_token,
            ]);
            
        $user = DB::table('users')->where('username',$username)->select('id','username','access_token')->first();
        return json_encode($user);
    }
        
    return '400';
    
});

Route::post('registration',function(Request $request){
    $username = $request->username;
    $password = $request->password;
    
    $check = DB::table('users')->where('username',$username)->first();
        if(isset($check)){
           return '400';
        }
        
    DB::table('users')->insert([
                'username' => $username,
                'password' => bcrypt($password),
            ]);
        
        return '200';
    
});

Route::get('singlePage/{id}',function($id){
    $user = DB::table('leads')->where('id',$id)->first();
    
    if(isset($user)){
        return json_encode($user);
    }
    
    return '400';
});

Route::get('getAll/{user_id}',function($id){
    $data = DB::table('leads')->where('user_id',$id)->orderBy('id','desc')->get();
    return json_encode($data);
});

 Route::post('/api-test',function(Request $request){
        $name = $request->name;
        $description = $request->description;
        $address = $request->address;
        $company = $request->company;
        $about = $request->about;
        $image = $request->img;
        $profile_id = $request->id;
        $user_id = $request->user_id;
        $notes = $request->notes;
        $status = $request->status;
        $conversion = $request->conversion;
        $discovery_call = $request->discovery_call;
        $endorsement = $request->endorsement;
        $priority = $request->priority;
        $total_messages = $request->total_messages;
        $follow_up = $request->follow_up;
        $profile_link = $request->profile_link;
        $weekly_source = $request->weekly_source;
        $weekly_date = $request->weekly_date;
        
        
        if (strpos($image, 'data:image/') !== false) {
            $image = 'https://i.stack.imgur.com/l60Hf.png';
        }
        
        $about = str_replace('see more','',$about);
        
       
        
        $check = DB::table('leads')->where('profile_link',$profile_link)->where('user_id',$user_id)->first();
        if(isset($check)){
           DB::table('leads')->where('profile_link',$profile_link)->where('user_id',$user_id)->update([
                'notes' => $notes,
                'status' => $status,
                'follow_up' => $follow_up,
                'conversion' => $conversion,
                'discovery_call' => $discovery_call,
                'priority' => $priority,
                'endorsement' => $endorsement,
                'total_messages' => $total_messages,
                'profile_link' => $profile_link,
                'weekly_source' => $weekly_source,
                'weekly_date' => $weekly_date,
               ]);
           
           
           
           return '200';
        }
        
        
        
        DB::table('leads')->insert([
                'profile_id' => $profile_id,
                'name' => $name,
                'description' => $description,
                'address' => $address,
                'company' => $company,
                'about' => $about,
                'image' => $image,
                'user_id' => $user_id,
                'notes' => $notes,
                'status' => $status,
                'follow_up' => $follow_up,
                'conversion' => $conversion,
                'discovery_call' => $discovery_call,
                'priority' => $priority,
                'endorsement' => $endorsement,
                'total_messages' => $total_messages,
                'profile_link' => $profile_link,
                'weekly_source' => $weekly_source,
                'weekly_date' => $weekly_date,
            ]);
        
        return '200';
});
    
  