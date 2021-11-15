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
            $this->scripts = array("utilities");
            $this->addScript("main");
            $this->styles = array("style");

         }
        public function display($data = []){
            $view = 'home';
            $datas = !empty($data) ? $data : [];
            require_once VIEW_DIR . "/page.phtml";
        }
        /* 
            fonction permmettant l'ajout d'un script à la page
            @param string $script: le nom du script sans l'extension
        */
        public function addScript(string $script){
            array_push($this->scripts,$script);
        }
        /* 
            fonction permmettant l'ajout d'un style à la page
            @param string $style: le nom du style sans l'extension
        */
        public function addStyle(string $style){
            array_push($this->styles,$style);
        }
    }