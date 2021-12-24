<?php
    namespace Controllers;

    class AjaxController {
        function __construct(object $controller){
            
            $this->controller = $controller;
        }
        /* 
            Cette fonction permet de servir les différentes routes
            utilisant les requêtes ajax et ainsi d'alléger l'index
        */
        public function router(string $action):void{
            $json = $this->parseJsonData();
            switch($action){
                case "checkIfExist":
                    $moviesId = $this->controller->pullMoviesId();
                    $differentsId = [];
                    $i =0;
                    $lastIdEnter;
                    /* 
                        ici on vérifie que les id des films envoyé par l'api sont présent dans la BBD
                        si ce n'est pas le cas on les ajoutera 
                    */
                    foreach($moviesId as $api_id){
                        foreach($api_id as $id ){

                            if($id != null)
                                array_push($differentsId,$id);
                        }
                    }
                    echo json_encode($differentsId);
                break;
                case "addMovies":
                   var_dump( $this->controller->newMovie($json) );

                break; 
                case "getMovies":
                    $movies = $this->controller->pullAllMoviesAdvanced($json);
                    echo (json_encode($movies));
                break;
                default:
                    echo "salut ;default";
                break;
            }
        }
        public function parseJsonData(){
            $json = file_get_contents("php://input");
            $json = json_decode($json, true);
            return $json;
        }
    }