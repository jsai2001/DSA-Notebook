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
#include <vector>
class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        std::vector<int> vals; // @viz init
        inorder(root, vals); // every value, smallest first // @viz init
        return vals[k - 1]; // @viz return
    }
private:
    void inorder(TreeNode* node, std::vector<int>& vals) { // left, node, right: a BST comes out sorted // @viz visit
        if (!node) return; // @viz visit
        inorder(node->left, vals); // @viz visit
        vals.push_back(node->val); // @viz add
        inorder(node->right, vals); // @viz visit
    }
};
