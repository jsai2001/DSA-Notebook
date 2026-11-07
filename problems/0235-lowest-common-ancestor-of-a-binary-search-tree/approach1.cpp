/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <unordered_map>
#include <unordered_set>
#include <vector>
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        std::unordered_map<TreeNode*, TreeNode*> parent{{root, nullptr}}; // each node's parent, found by walking the whole tree // @viz walk
        std::vector<TreeNode*> stack{root}; // @viz walk
        while (!stack.empty()) { // @viz walk
            TreeNode* node = stack.back(); // @viz walk
            stack.pop_back(); // @viz walk
            for (TreeNode* child : {node->left, node->right}) // @viz walk
                if (child) { // @viz walk
                    parent[child] = node; // @viz walk
                    stack.push_back(child); // @viz walk
                }
        }
        std::unordered_set<TreeNode*> ancestors; // p and everything above it // @viz up
        for (; p; p = parent[p]) ancestors.insert(p); // @viz up
        while (!ancestors.count(q)) q = parent[q]; // climb from q until the paths meet // @viz meet
        return q; // @viz return
    }
};
