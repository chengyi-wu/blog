import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = b'\xb55\x16\xde]\x9b\x1f\xbe\x10\xd9^\xd2\x8f\x07p\xd3Jh\xf0l\x80\x95&Ll\xd7\xd7\xb3\x81\xbc\x95\xbb\xc45E_\x82\xf1\x85A-?\x90\xa5/\x04M)\xb3\xae\xc8"l|\x90_\xa1u\x87\xf25YC\x1fl\xcd\x81x\xf6Qni\xc2\xaf~\x1f\x82\xa1%\x9b\xaft\xd7Sd\xe0\xf0\x8c\xa2\xf6\xe7\xea\x89\xb3\x82\xc9\xc7s\xa2\xfb[\xdc\x8a~}\xbe\x8fXB\x91\x00\x84\x97\xa9/\xae1)5V\xe8\x15\xdc\xc1\xe0\xbe\x81\x16\xa7\xdb>\xdd\xd2_\xc1L\x7f\x91\xf6\x98A\x0c>\x1e\x98\xf4\x8e\x19\xfa\x8e\x7fQ[].S\xd87\xd1\xe6\xc4pR\xa3|\x83\xfe\xf5\xa6>s\xc2\x0b\xf0\\*{\x80$\x1f\x1d\xc9i0\xe4\x92\x94\xdbk\x15AE\x97EL\xe3\xda\xf5\x154\x17HHQ\xfb\xb7\x9d\xfb\xe9i\x9c\xbaEs\x1d\xf4\x1f\x8b\xf2\x85\x9c\xcd\xb4\x9c\xb7\x05\xf3/\xbcX\xd4\x02VU\xdd\xad\x19I\x1d\x0e\xa4.\x87r\xd9L\xb1g\xe5\x0byw7\xfbh\xe4'
    DEBUG = False


class DevConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data-dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config_by_name = {
    "dev" : DevConfig
}

WEBPACK_MANIFEST_PATH = basedir + '/manifest.json'