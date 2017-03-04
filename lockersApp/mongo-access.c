#include <stdlib.h>

#include <bson.h>
#include <bcon.h>
#include <mongoc.h>


typedef struct mongo_instance {
    mongoc_client_t      *client;
    mongoc_database_t    *database;
    mongoc_collection_t  *collection;
} mongo_instance_t;

/**
 * Initializes a connection to the mongo database.
 * @server_adr : the server address
 * @database_name : the name of the database to use
 * @collection_name : the name of the collection on which work
 * @returns a mongo instance ready to use
 */
mongo_instance_t *init_connection (char *server_adr, char *database_name, char *collection_name) {
    mongo_instance_t *instance = malloc(sizeof(mongo_instance_t));

    /*
    * Required to initialize libmongoc's internals
    */
    mongoc_init ();

    /*
    * Create a new client instance
    */
    instance->client = mongoc_client_new (server_adr);

    /*
    * Get a handle on the database "db_name" and collection "coll_name"
    */
    instance->database = mongoc_client_get_database (instance->client, database_name);
    instance->collection = mongoc_client_get_collection (instance->client, database_name, collection_name);

    return instance;
}

void destroy_instance (mongo_instance_t *instance) {
    /*
    * Release our handles and clean up libmongoc
    */
    mongoc_collection_destroy (instance->collection);
    mongoc_database_destroy (instance->database);
    mongoc_client_destroy (instance->client);
    mongoc_cleanup ();
}

int main (int argc, char *argv[])
{
    char *server_adr = "mongodb://localhost:27017";
    char *database_name = "lockers";
    char *collection_name = "code";

    mongo_instance_t *instance = init_connection(server_adr, database_name, collection_name);

   bson_t                reply,
                        *insert,
                        *query,
                        *opts,
                        *update;
   bson_error_t          error;
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   char                 *str;


   query = BCON_NEW ("code", BCON_UTF8 ("azerty"));
   opts = BCON_NEW (
      "limit", BCON_INT64 (10), "sort", "{", "code", BCON_INT32 (-1), "}");
    update = BCON_NEW ("$set", "{",
                        "verif", BCON_BOOL (true),
                    "}");

  cursor = mongoc_collection_find_with_opts (instance->collection, query, opts, NULL);

  while (mongoc_cursor_next (cursor, &doc)) {
     str = bson_as_json (doc, NULL);
     printf ("%s\n", str);
     bson_free (str);
  }

    if (!mongoc_collection_update (instance->collection, MONGOC_UPDATE_NONE, query, update, NULL, &error)) {
        printf ("%s\n", error.message);
    } else {
        printf("Traitement effectué.\n");
    }


  cursor = mongoc_collection_find_with_opts (instance->collection, query, opts, NULL);

  while (mongoc_cursor_next (cursor, &doc)) {
     str = bson_as_json (doc, NULL);
     printf ("%s\n", str);
     bson_free (str);
  }

   mongoc_cursor_destroy (cursor);
   bson_destroy (query);
   bson_destroy (update);
   bson_destroy (opts);

   return 0;
}