import "./style.scss";

const requireAll = (requireContext) =>
	requireContext.keys().map(requireContext);
const req = require.context("./blocks", true, /index\.(js|ts|tsx)$/);
requireAll(req);
