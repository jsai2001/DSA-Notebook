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
#include <algorithm>
#include <stack>
#include <unordered_map>
#include <utility>
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        std::unordered_map<TreeNode*, int> height{{nullptr, 0}}; // height of every finished node; an empty child has height 0 // @viz init
        int best = 0; // @viz init
        std::stack<std::pair<TreeNode*, bool>> stack; // (node, are its children finished?) // @viz init
        stack.push({root, false}); // @viz init
        while (!stack.empty()) { // @viz loop
            auto [node, childrenDone] = stack.top(); // @viz loop
            stack.pop(); // @viz loop
            if (!node) continue; // @viz skip
            if (childrenDone) { // both subtrees are finished: work out this node // @viz finish
                int left = height[node->left], right = height[node->right]; // @viz finish
                best = std::max(best, left + right); // @viz finish
                height[node] = 1 + std::max(left, right); // @viz finish
            } else { // come back to node after its children // @viz push
                stack.push({node, true}); // @viz push
                stack.push({node->right, false}); // @viz push
                stack.push({node->left, false}); // @viz push
            }
        }
        return best; // @viz return
    }
};
