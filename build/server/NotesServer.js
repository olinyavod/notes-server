"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const odata_v4_server_1 = require("odata-v4-server");
let NotesServer = class NotesServer extends odata_v4_server_1.ODataServer {
};
NotesServer = tslib_1.__decorate([
    odata_v4_server_1.odata.cors
], NotesServer);
exports.default = NotesServer;
//# sourceMappingURL=NotesServer.js.map