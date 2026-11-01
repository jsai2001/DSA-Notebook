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
        return diameter(root); // @viz start
    }
private:
    int height(TreeNode* node) { // nodes on the longest path down from node (0 for nullptr)
        if (!node) return 0;
        return 1 + std::max(height(node->left), height(node->right));
    }
    int diameter(TreeNode* node) { // @viz call
        if (!node) return 0; // @viz empty
        int through = height(node->left) + height(node->right); // edges on the longest path that bends at node // @viz through
        return std::max({through, diameter(node->left), diameter(node->right)}); // or it lies inside one subtree // @viz best
    }
};
