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
    int diameterOfBinaryTree(TreeNode* root) {
        best = 0; // longest path seen so far, in edges // @viz init
        height(root); // @viz start
        return best; // @viz answer
    }
private:
    int best = 0;
    int height(TreeNode* node) { // returns nodes on the longest path down; updates best on the way // @viz call
        if (!node) return 0; // @viz empty
        int left = height(node->left); // @viz left
        int right = height(node->right); // @viz right
        best = std::max(best, left + right); // the path that bends here has left + right edges // @viz best
        return 1 + std::max(left, right); // node's height, for its parent // @viz return
    }
};
