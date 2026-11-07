/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
#include <sstream>
#include <string>
class Codec {
public:
    std::string serialize(TreeNode* root) {
        std::string out; // pre-order: node, left subtree, right subtree; "#" for null // @viz ser
        walk(root, out); // @viz ser
        out.pop_back(); // drop the last comma // @viz trim
        return out; // @viz trim
    }
    TreeNode* deserialize(std::string data) {
        std::stringstream ss(data); // read the tokens in the same order they were written // @viz root
        return build(ss); // @viz return
    }
private:
    void walk(TreeNode* node, std::string& out) { // @viz ser
        if (!node) { out += "#,"; return; } // @viz ser
        out += std::to_string(node->val) + ","; // @viz ser
        walk(node->left, out); // @viz ser
        walk(node->right, out); // @viz ser
    }
    TreeNode* build(std::stringstream& ss) { // @viz link
        std::string t; // @viz link
        std::getline(ss, t, ','); // @viz link
        if (t == "#") return nullptr; // @viz empty
        TreeNode* node = new TreeNode(std::stoi(t)); // @viz link
        node->left = build(ss); // the left subtree's tokens come right after the node // @viz link
        node->right = build(ss); // @viz link
        return node; // @viz link
    }
};
