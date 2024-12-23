import React from "react";
import {registerBlockType} from "@wordpress/blocks";

registerBlockType("modcul-digital-blocks/hello-world", {
	title: "Hello World",
	icon: "smiley",
	category: "common",
	edit: () => <div>Hello World</div>,
	save: () => <div>Hello World</div>,
});
