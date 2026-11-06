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
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        best = root->val; // @viz init
        visit(root); // @viz init
        return best; // @viz return
    }
private:
    int best = 0;
    int down(TreeNode* node) { // the best path that starts at node and only goes down (it may stop at node) // @viz down
        if (!node) return 0; // @viz down
        return node->val + std::max({0, down(node->left), down(node->right)}); // @viz down
    }
    void visit(TreeNode* node) { // make every node the top of a path, one at a time // @viz top
        if (!node) return; // @viz top
        // The path bends at node: the best way down on each side, or nothing if that side is negative.
        int here = node->val + std::max(0, down(node->left)) + std::max(0, down(node->right)); // @viz sum
        best = std::max(best, here); // @viz sum
        visit(node->left); // @viz top
        visit(node->right); // @viz top
    }
};
