#!/usr/bin/env node
import { Registrar } from "../application/Registrar"
import { Container } from "typedi"

Container.get(Registrar).start()
