 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/main.jsx b/src/main.jsx
new file mode 100644
index 0000000000000000000000000000000000000000..b9c03704b2cebf136ddf57b6a515a29253694f51
--- /dev/null
+++ b/src/main.jsx
@@ -0,0 +1,13 @@
+import React from 'react';
+import { createRoot } from 'react-dom/client';
+import App from './App.jsx';
+import './index.css';
+
+const rootElement = document.getElementById('root');
+if (rootElement) {
+  createRoot(rootElement).render(
+    <React.StrictMode>
+      <App />
+    </React.StrictMode>,
+  );
+}
 
EOF
)
