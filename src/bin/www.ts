#!/usr/bin/env node
import {HelloController} from "../hello/HelloController";
import {Registrar} from "../application/Registrar";

new Registrar(new HelloController()).start()
