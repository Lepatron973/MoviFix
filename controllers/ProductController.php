<?php
    namespace Controllers;

    class ProductController extends Controller{
        function pullAllProducts():array{
            $datas = $this->model->getAllProducts();
            $products = [];
            $newProduct = [];
            $i = 0;
            $idRef = 0;

            foreach ($datas as $key => $data) {
                if ($idRef != $data["id_product"]) {
                    $idRef = $data["id_product"];
                    $products[] = $data;
                    $products[$key]["func_name"] = [$data["func_name"]];
                    $i++;
                }else{
                    $products[$i-1]["func_name"][] = $data["func_name"];
                }
            }
            return $products;

        }   
        function pullOneProduct(string $id):array{
            $datas = $this->model->getOneProduct($id);
            return $datas;
        }
        function passOrder(array $ids):bool{
           
            return $this->model->order($ids);
        }
        function modifyMovie():void{
           
            $datas = $this->model->updateMovie();
    
        }
        function newMovie(array $movie = []):void{
            $data = $movie;
            $this->model->addMovie($data);
        }
    }
    