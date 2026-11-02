#include <string>
class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        std::string text, pattern;
        ser(root, text);
        ser(subRoot, pattern);
        return text.find(pattern) != std::string::npos; // the "," stops ",2" from matching inside ",12"
    }
private:
    void ser(TreeNode* node, std::string& out) { // "," before every value, "#" for a missing child
        if (!node) { out += ",#"; return; }
        out += "," + std::to_string(node->val);
        ser(node->left, out);
        ser(node->right, out);
    }
};
