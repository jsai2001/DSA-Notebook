/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
#include <string>
#include <utility>
#include <vector>
class Codec {
public:
    std::string serialize(TreeNode* root) {
        std::string out; // pre-order with "#" for null, but with a stack instead of recursion // @viz ser
        std::vector<TreeNode*> stack{root}; // @viz ser
        while (!stack.empty()) { // @viz ser
            TreeNode* node = stack.back(); // @viz ser
            stack.pop_back(); // @viz ser
            if (!node) { out += "#,"; continue; } // @viz ser
            out += std::to_string(node->val) + ","; // @viz ser
            stack.push_back(node->right); // push right first, so left comes out first // @viz ser
            stack.push_back(node->left); // @viz ser
        }
        out.pop_back(); // drop the last comma // @viz trim
        return out; // @viz trim
    }
    TreeNode* deserialize(std::string data) {
        std::vector<std::string> tokens; // @viz root
        for (size_t a = 0, b; a <= data.size(); a = b + 1) { // @viz root
            b = data.find(',', a); // @viz root
            if (b == std::string::npos) b = data.size(); // @viz root
            tokens.push_back(data.substr(a, b - a)); // @viz root
        }
        if (tokens[0] == "#") return nullptr; // @viz empty
        TreeNode* root = new TreeNode(std::stoi(tokens[0])); // @viz root
        std::vector<std::pair<TreeNode*, int>> stack{{root, 0}}; // (node, how many children it has been given so far) // @viz root
        for (size_t k = 1; k < tokens.size(); ++k) { // each token is the next missing child of the node on top // @viz link
            auto& parent = stack.back(); // @viz link
            TreeNode* child = tokens[k] == "#" ? nullptr : new TreeNode(std::stoi(tokens[k])); // @viz link
            (parent.second == 0 ? parent.first->left : parent.first->right) = child; // @viz link
            ++parent.second; // @viz link
            while (!stack.empty() && stack.back().second == 2) stack.pop_back(); // both children set: this node is done // @viz link
            if (child) stack.push_back({child, 0}); // a real node: its own children come next // @viz link
        }
        return root; // @viz return
    }
};
