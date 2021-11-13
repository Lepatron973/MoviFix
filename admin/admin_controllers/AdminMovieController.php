<?php
    namespace Admin_controllers;

    class AdminMovieController extends AdminController{
        function pullAllMovies(){
            $table = "movies";
            $datas = $this->model->getAllMovies($table);
            return $datas;
        }
        function pullOneMovie($param){
            $table = "movies";
            $datas = $this->model->getOneMovie($param);
            return $datas;
        }
        function modifyMovie(){
           
            $datas = $this->model->updateMovie();
    
        }
        function newMovie(){
            $this->model->addMovie();
        }
    }