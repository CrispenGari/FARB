"""
* note that you only need to download the tokenizer model once from spacy. 
"""
# import spacy
# spacy.cli.download("en_core_web_sm")

import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from api.app import app
from flask import make_response, jsonify, request, json
from ariadne import  load_schema_from_path, make_executable_schema, graphql_sync, combine_multipart_data
from ariadne.constants import PLAYGROUND_HTML
from api.resolvers.queries import query
from api.resolvers.mutations import mutation
from api.blueprints import blueprint

type_defs = load_schema_from_path("schema/schema.graphql")
schema = make_executable_schema(
    type_defs, [query, mutation, ]
)

class AppConfig:
    PORT = 3001
    DEBUG = False
    
app.register_blueprint(blueprint, url_prefix="/api")

@app.route('/', methods=["GET"])
def meta():
    meta = {
        "programmer": "@crispengari",
        "main": "First Aid Recommendation Bot(FARB)",
        "description": "This Bot is a virtual assistance BOT that helps humans in First Aid Recommendations Treatments. Given a message or description of illness, the bot should be able to 99.11% accurately give the user First Aid Recommendations.",
        "language": "python",
        "libraries": ["pytorch", "torchtext", "spacy"],
    }
    return make_response(jsonify(meta)), 200

@app.route("/graphql", methods=["GET"], )
def graphql_playground():
    return PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
    if  request.content_type.startswith("multipart/form-data" ):
         data = combine_multipart_data(
            json.loads(request.form.get("operations")),
            json.loads(request.form.get("map")),
            dict(request.files)
        )
    else:
        data =  request.get_json()
        
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug= AppConfig.DEBUG
    )
    return jsonify(result), 200 if success else 400

if __name__ == "__main__":
    app.run(debug=AppConfig().DEBUG, port=AppConfig().PORT, )