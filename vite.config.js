 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/vite.config.js b/vite.config.js
new file mode 100644
index 0000000000000000000000000000000000000000..0466183af6ac8a9f74ced8fe1d8bcbf6c85dce5e
--- /dev/null
+++ b/vite.config.js
@@ -0,0 +1,6 @@
+import { defineConfig } from 'vite';
+import react from '@vitejs/plugin-react';
+
+export default defineConfig({
+  plugins: [react()],
+});
 
EOF
)
