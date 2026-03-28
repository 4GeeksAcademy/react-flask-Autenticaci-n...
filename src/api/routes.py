from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

# mi ruta de registro, creando usuario en la base de datos.


@api.route('/signup', methods=['POST', 'GET'])
def handle_hello():
    body = request.get_json()  # esto es para guardar todo lo que viene del front

    if body is None:
        return jsonify({"msg": "Espacio Vacio 🥹"}), 400

    email = body.get("email")
    password = body.get("password")

# ahora verifico que no me falten datos
    if not email or not password:
        return jsonify({"msg": "No olvides de escribir tu Email y password"}), 400

# ahora verifico si el usuario existe, para que no se me rompa la base de datos.

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg:" "Este usuario ya existe"}), 400

# ahora creo el nuevo usuario

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "¡Bienvenido! El usuario ha sido creado correctamente"}), 201

  # Ruta Logueo ahora genero el dichoso Token solo si las credenciales son validas.


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    # busco el usuario por su correo "email"

    user = User.query.filter_by(email=email).first()

    # si no existe o la contraseña no coincide, pongo el error 401

    if user is None or user.password != password:
        return jsonify({"msg": "Este dato es invalido, ¡Revisa bien!"}), 401

        # Aqui me creo el token utilizando el id del usuario

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200


# creeo una ruta con privada, aqui solo entra quien tenga el token ok

@api.route('/private', methods=['GET'])
@jwt_required()
def private():  # aqui obtengo el id del usuario desde el token
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"msg": "¡Tienes el acceso!", "user": user.serialize()}), 200
