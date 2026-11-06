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
        best = root->val; // at least one node is on every path // @viz init
        gain(root); // @viz init
        return best; // @viz return
    }
private:
    int best = 0;
    int gain(TreeNode* node) { // the best path that starts at node and goes down one side // @viz call
        if (!node) return 0; // @viz call
        int left = std::max(0, gain(node->left)); // a negative side only hurts: leave it out // @viz left
        int right = std::max(0, gain(node->right)); // @viz right
        best = std::max(best, node->val + left + right); // a path that bends here can use both sides // @viz bend
        return node->val + std::max(left, right); // going up, a path can only continue down one side // @viz up
    }
};
