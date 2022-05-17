// https://api.github.com/repos/nickztar/berlexdevtools/releases/latest
import fetch from "node-fetch";
import { readFile } from "node:fs/promises";
const VPAT = /^\d+(\.\d+){0,2}$/;
const upToDate = (local, remote) => {
    if (!local || !remote || local.length === 0 || remote.length === 0)
        return false;
    if (local == remote) return true;
    if (VPAT.test(local) && VPAT.test(remote)) {
        var lparts = local.split(".");
        while (lparts.length < 3) lparts.push("0");
        var rparts = remote.split(".");
        while (rparts.length < 3) rparts.push("0");
        for (var i = 0; i < 3; i++) {
            var l = parseInt(lparts[i], 10);
            var r = parseInt(rparts[i], 10);
            if (l === r) continue;
            return l > r;
        }
        return true;
    } else {
        return local >= remote;
    }
};

const response = await fetch(
    "https://api.github.com/repos/nickztar/berlexdevtools/releases/latest"
);
const confFile = await readFile("./src-tauri/tauri.conf.json", {
    encoding: "utf8",
});
const json = await response.json();
const config = JSON.parse(confFile);

const releasedVersion = json.tag_name;
const localVersion = config.package.version;
const isUpToDate = upToDate(localVersion, releasedVersion);
if (!isUpToDate) throw new Error("Update the version for release branch");
