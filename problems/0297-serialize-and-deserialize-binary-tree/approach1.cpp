/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
#include <queue>
#include <sstream>
#include <string>
#include <vector>
class Codec {
public:
    std::string serialize(TreeNode* root) {
        std::vector<std::string> out; // level by level, "null" for every missing child // @viz ser
        std::queue<TreeNode*> queue; // @viz ser
        queue.push(root); // @viz ser
        while (!queue.empty()) { // @viz ser
            TreeNode* node = queue.front(); // @viz ser
            queue.pop(); // @viz ser
            if (node) { // @viz ser
                out.push_back(std::to_string(node->val)); // @viz ser
                queue.push(node->left); // @viz ser
                queue.push(node->right); // @viz ser
            } else out.push_back("null"); // @viz ser
        }
        while (!out.empty() && out.back() == "null") out.pop_back(); // trailing nulls carry no information // @viz trim
        std::string s; // @viz trim
        for (size_t i = 0; i < out.size(); ++i) s += (i ? "," : "") + out[i]; // @viz trim
        return s; // @viz trim
    }
    TreeNode* deserialize(std::string data) {
        if (data.empty()) return nullptr; // @viz empty
        std::vector<std::string> vals; // @viz root
        std::stringstream ss(data); // @viz root
        for (std::string t; std::getline(ss, t, ',');) vals.push_back(t); // @viz root
        TreeNode* root = new TreeNode(std::stoi(vals[0])); // @viz root
        std::queue<TreeNode*> queue; // parents waiting for their two children, in order // @viz root
        queue.push(root); // @viz root
        size_t i = 1; // @viz root
        while (!queue.empty() && i < vals.size()) { // @viz link
            TreeNode* node = queue.front(); // the next two tokens are its left and right child // @viz link
            queue.pop(); // @viz link
            for (TreeNode** side : {&node->left, &node->right}) { // @viz link
                if (i < vals.size() && vals[i] != "null") { // @viz link
                    *side = new TreeNode(std::stoi(vals[i])); // @viz link
                    queue.push(*side); // @viz link
                }
                ++i; // @viz link
            }
        }
        return root; // @viz return
    }
};
