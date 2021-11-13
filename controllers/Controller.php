<?php
    namespace Controllers;

    class Controller{
        protected $view;
        protected $model;
        protected $scripts;
        protected $styles;
        function __construct(array $data = []){
           
            if(!empty($data)){
                $this->view = $data["name"];
                $this->model = $data["model"];
            }else{
                $this->view = "home";
            }
            $this->scripts = array("main");
            $this->styles = array("style");

         }
        public function display($data = []){
            $view = 'home';
            $datas = !empty($data) ? $data : [];
            require_once VIEW_DIR . "/page.phtml";
        }

        public function addScript(string $script){
            array_push($this->scripts,$script);
        }
        public function addStyle(string $style){
            array_push($this->styles,$style);
        }
        /* 
            récupère les données du flux de la requête POST envoyé par l'Objet Request du javascript
            retourne la variable $json contenant les données prêtes à utiliser
         */
    }