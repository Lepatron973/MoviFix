<?php
    session_start();
    require_once "../config/config.php";
    require_once "./admin_controllers/Controller.php";
    require_once "./admin_models/Database.php";
    spl_autoload_register(function ($class) {
       $file =  lcfirst(str_replace('\\','/',$class));
        require_once ROOT_DIR ."/admin/". $file . '.php';
    });
    $page = array (
        "name" => $_GET["path"],
        "model" => new Admin_models\AdminUser()
    );
    if(isset($_POST['email'])){
        $controller = new Admin_controllers\AdminUserController($page);
        $controller->connexion();
    }
    // var_dump($_GET);
    // if(!isset($_SESSION["user"])){
    //     $_SESSION["user"] = array(
    //         "status" => false
    //     );
    // }
    // VÉRIFIE si l'utilisateur est administrateur
    if($_SESSION["user"]['status'] == 2){
       
        if($_GET['path']){
           
            
            switch($_GET['path']){
                
                case "home":
                    $controller = new Admin_controllers\AdminHomeController($page);
                    $controller->display();
                break;
                case "manage":
                    $page['model'] = new Admin_models\AdminMovies();
                    $controller = new Admin_controllers\AdminMovieController($page);
                    if($_GET['param2'] == "update" ){
                        
                        $controller->modifyMovie();
    
                    }elseif($_GET['param2'] == "add" ){
                        $controller->newMovie();
                    }
                    
                    $datas = $controller->pullAllMovies();
                    $controller->addScript($page['name']);
                    $controller->display($datas);

                break;
                case "disconnect":
                    session_destroy();
                    header("location: /admin/home");
                break;
                case 'ajax':
                    $param = $_GET['param'];
                    $page['model'] = new Admin_models\AdminMovies();
                    $controller = new Admin_controllers\AdminMovieController($page);
                    $datas = $controller->pullOneMovie($param);
                    echo json_encode($datas);

                break;
            }
        }else{
            header("location: /home");
        }
    } elseif($_GET['path'] == "connexion"){

        $controller = new Admin_controllers\AdminUserController($page);
        $controller->display();
    
    }else{
        header("location: /admin/connexion");
    }