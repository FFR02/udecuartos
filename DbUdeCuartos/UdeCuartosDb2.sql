PGDMP                     
    y         
   udecuartos    11.11    14.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16525 
   udecuartos    DATABASE     n   CREATE DATABASE udecuartos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE udecuartos;
                kevin    false            �            1259    16526 	   Hospedaje    TABLE     X  CREATE TABLE public."Hospedaje" (
    titulo character varying(50) NOT NULL,
    tipo character varying(70),
    direccion character varying(50) NOT NULL,
    ubicacion character varying(70) NOT NULL,
    precio integer NOT NULL,
    servicios character varying(50),
    imagen character varying,
    id integer NOT NULL,
    iduser integer
);
    DROP TABLE public."Hospedaje";
       public            kevin    false            �            1259    16532    User    TABLE       CREATE TABLE public."User" (
    nombre character varying(100) NOT NULL,
    cedula bigint NOT NULL,
    ubicacion character varying(70) NOT NULL,
    id integer NOT NULL,
    correo character varying(50),
    clave character varying(500),
    sal character varying(500)
);
    DROP TABLE public."User";
       public            kevin    false            �            1259    16538    hospedaje_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hospedaje_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.hospedaje_id_seq;
       public          kevin    false    200            �           0    0    hospedaje_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.hospedaje_id_seq OWNED BY public."Hospedaje".id;
          public          kevin    false    202            �            1259    16540    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          kevin    false    201            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."User".id;
          public          kevin    false    203                       2604    16542    Hospedaje id    DEFAULT     n   ALTER TABLE ONLY public."Hospedaje" ALTER COLUMN id SET DEFAULT nextval('public.hospedaje_id_seq'::regclass);
 =   ALTER TABLE public."Hospedaje" ALTER COLUMN id DROP DEFAULT;
       public          kevin    false    202    200                       2604    16543    User id    DEFAULT     d   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          kevin    false    203    201            �          0    16526 	   Hospedaje 
   TABLE DATA           p   COPY public."Hospedaje" (titulo, tipo, direccion, ubicacion, precio, servicios, imagen, id, iduser) FROM stdin;
    public          kevin    false    200   N       �          0    16532    User 
   TABLE DATA           S   COPY public."User" (nombre, cedula, ubicacion, id, correo, clave, sal) FROM stdin;
    public          kevin    false    201   �       �           0    0    hospedaje_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.hospedaje_id_seq', 27, true);
          public          kevin    false    202            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 13, true);
          public          kevin    false    203                       2606    16545    Hospedaje hospedaje_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Hospedaje"
    ADD CONSTRAINT hospedaje_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Hospedaje" DROP CONSTRAINT hospedaje_pkey;
       public            kevin    false    200                       2606    16553    User unique_doc 
   CONSTRAINT     N   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT unique_doc UNIQUE (cedula);
 ;   ALTER TABLE ONLY public."User" DROP CONSTRAINT unique_doc;
       public            kevin    false    201                       2606    16549    User unique_email 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT unique_email UNIQUE (correo);
 =   ALTER TABLE ONLY public."User" DROP CONSTRAINT unique_email;
       public            kevin    false    201                       2606    16547    User user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."User" DROP CONSTRAINT user_pkey;
       public            kevin    false    201            �   .  x���AO�0���S4�j(:�7%�1��e�mY7�@K���e`6�K�������������>p�ݟR8Dsi�Vohmmk���J\5���Bׄ�?ZW�D�P
2��N\��"��4��88)�Y�*(������iKDQ�eGm,:��j���
�\Y4�-� V9�2<�ϐ+��n1"σI��Lѫ6� �Q��VR]�D�$��!1�V�z����ע��ɉ��s�3�[=]��J�����K����Q���+���1eD�np���vc�]-�V7�IPy+��_*�      �   �  x�M�Ko�@��ïpOR�rY���(r�R�nF�p�:�R~}iM�ϓ�{O��(l+ ��a
/����c7�EW���'+�sIw��B"�~�5�s�@\?��#4}"�I\bu�B٣ut��ȶD���,T���QsG�M�9�](��P��y�d	���=:��,�����cK�S�)��?������o{\����c	7o�J�|H9�k-������h\�V�;^^��5M^�b����Q=�`{�-��Uߎ�v4���Hϲ3Ψ�Ym�l*��8��`Ж�+	�0��R+E��9Gm���Iӑ��?�H��n�0*�,$%� Ȓ*�5E�>/���n#}�敪�j�՚�{��Z�1�4�d;k+�|�xmK�>,,�<xق��	���0��ɥ�     