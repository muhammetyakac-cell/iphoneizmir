 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/tailwind.config.cjs b/tailwind.config.cjs
new file mode 100644
index 0000000000000000000000000000000000000000..173282d1a10ba66f22e46fc22f84f9fda330196e
--- /dev/null
+++ b/tailwind.config.cjs
@@ -0,0 +1,7 @@
+module.exports = {
+  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
+  theme: {
+    extend: {},
+  },
+  plugins: [require('@tailwindcss/typography')],
+};
 
EOF
)
