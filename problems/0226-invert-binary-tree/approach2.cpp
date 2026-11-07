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
#include <queue>
#include <utility>
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        std::queue<TreeNode*> queue; // @viz init
        if (root) queue.push(root); // @viz init
        while (!queue.empty()) { // visit every node, level by level // @viz pop
            TreeNode* node = queue.front(); // @viz pop
            queue.pop(); // @viz pop
            std::swap(node->left, node->right); // swap its two children // @viz swap
            if (node->left) queue.push(node->left); // @viz push
            if (node->right) queue.push(node->right); // @viz push
        }
        return root; // @viz return
    }
};
