<?php 

/**
 * Categories model
 */


$app->get(      '/categories',        'getCategories');

// TODO: create functions below
//$app->get(      '/categories/:id',    'getCategory');
//$app->post(     '/categories/:id',    'addCategory');
//$app->put(      '/categories/:id',    'updateCategory');
//$app->delete(   '/categories/:id',    'deleteCategory');


// Show all categories
function getCategories() {

    $sql = 'SELECT * FROM `category`';

    try {
        $response['success'] = true;
        $db = getDB();
        $stmt = $db->query($sql); 
        $response = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
    } catch(PDOException $e) {
        $response['error'] = $e->getMessage();
    }

    $app = \Slim\Slim::getInstance();    
    $app->response->setBody(json_encode($response));
}

?>